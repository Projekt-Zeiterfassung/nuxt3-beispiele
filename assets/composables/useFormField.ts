import { accent } from '../functions/style';
import { computed, EmitsOptions, ExtractPropTypes, getCurrentInstance, ref, watch } from 'vue';
import { getFormInstance, rule, validateFormField } from '../functions/form';

export function useFormFieldProps<type = string>() {
    return {
        modelValue: {
            type: [String, Object, Array] as Array<() => type>,
            required: true,
        },
        'validate-on-update': {
            type: Boolean,
            default: false,
        },
        rules: {
            type: Array as () => rule<type>[],
            default: () => [],
        },
        accent: {
            type: String as () => accent,
            default: 'primary',
        },
        'show-error-always': {
            type: Boolean,
            default: false,
        },
        rootClass: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: '',
        },
    };
}

export function useFormField<type = string>(
    props: Readonly<
        ExtractPropTypes<ReturnType<typeof useFormFieldProps<type>>> & { [key: string]: any }
    >,
    resetValue: type,
) {
    const currentInstance = getCurrentInstance()!;

    const formInstance = getFormInstance(currentInstance);

    formInstance?.exposed?.registerFormField(currentInstance);

    // v-model
    const value = computed<type>({
        get() {
            return (props.modelValue as type) || resetValue;
        },
        set(value: type) {
            currentInstance.emit('update:modelValue', value);
        },
    });
    const error = ref('');

    function reset() {
        value.value = resetValue;
        error.value = '';
    }

    function resetValidation() {
        error.value = '';
    }

    function setError(newError: string) {
        error.value = newError;
    }

    function validate() {
        let result = false;

        if (props.rules.length == 0) result = true;
        else result = validateFormField(value, error, props.rules);

        formInstance?.exposed?.updateFormField(currentInstance, result);
        return result;
    }

    const toExpose = {
        reset,
        resetValidation,
        setError,
        validate,
    };

    if (props.validateOnUpdate) {
        watch(value, () => validate());
    }

    if (props.rules.length == 0) validate();

    return {
        currentInstance,
        formInstance,
        value,
        error,
        toExpose,
    };
}

export type useFormFieldEmit<type = string> = { (event: 'update:modelValue', value: type): void };
