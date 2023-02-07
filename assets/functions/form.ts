import { ComponentInternalInstance, Ref } from 'vue';

/**
 * A validation rule returns true if value of the form field is correct; if not it returns an error string which is displayed below the form field
 */
export type rule<T = any> = (value: T) => true | string;
export type ruleProvider<T = any> = (error: string) => rule<T>;

/**
 * Search the f-form component
 * @param instance the current instance
 * @returns if a f-form component is found, this component would be returned
 */
export function getFormInstance(
    instance: ComponentInternalInstance,
): ComponentInternalInstance | null {
    let currentInstance = instance;

    while (currentInstance.parent) {
        currentInstance = currentInstance.parent;

        if (currentInstance.type.name === 'f-form') return currentInstance;
    }

    return null;
}

/**
 * @param errorRef If rules detect an error, thr error string will be updated with the new error string
 * @param rules All rules of the form field
 */
export function validateFormField(
    valueRef: Ref<any>,
    errorRef: Ref<string>,
    rules: rule[] = [],
): boolean {
    for (const r of rules) {
        const result = r(valueRef.value);

        if (typeof result === 'string') {
            errorRef.value = result;
            return false;
        }
    }

    errorRef.value = '';
    return true;
}

export const Required: ruleProvider = error => value => !!value || error;

export const MinCharacters: (error: string, minLength: number) => rule<string> =
    (error, minLength) => value =>
        value.length > minLength || error;
export const MaxCharacters: (error: string, maxLength: number) => rule<string> =
    (error, maxLength) => value =>
        value.length < maxLength || error;

export const HaveNumber: ruleProvider = error => value => /[0-9]/.test(value) || error;
export const HaveLowerCaseLetter: ruleProvider = error => value => /[a-z]/.test(value) || error;
export const HaveUpperCaseLetter: ruleProvider = error => value => /[A-Z]/.test(value) || error;
export const HaveSpecialCharacter: (error: string, specialCahracters: string) => rule =
    (error, specialCahracters) => value =>
        RegExp(specialCahracters).test(value) || error;

export const IsEmail: ruleProvider = error => value =>
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(
        value,
    ) || error;

export const IsNumber: (error: string) => rule = error => value =>
    Number.isNaN(Number(value)) || error;

export const IsNumberInRange: (error: string, upperLimit: number, lowerLimit: number) => rule =
    (error, upperLimit, lowerLimit) => value => {
        const n = Number(value);

        return (n < upperLimit && n > lowerLimit) || error;
    };

export const IsEquals: <T>(error: string, toCompare: T) => rule<T> = (error, toCompare) => value =>
    toCompare === value || error;