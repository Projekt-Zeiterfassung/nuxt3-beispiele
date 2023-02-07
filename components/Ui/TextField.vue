<script lang="ts">
/**
 * Standart text-field (input)
 */
export default {
    inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { ref, useAttrs } from 'vue';
import { useFormField, useFormFieldProps } from '~/assets/composables';
import type { useFormFieldEmit } from '~/assets/composables';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { convertStyle } from '~/assets/functions';

const props = defineProps({
    ...useFormFieldProps(),
    type: {
        type: String,
        default: 'text',
    },
    label: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    transparent: {
        type: Boolean,
        default: true,
    },
    icon: {
        type: Object as () => string | object | string[],
        required: false,
    },
});
const passwordVisible = ref(false);
const { error, toExpose, value } = useFormField<string>(props, '');
defineEmits<useFormFieldEmit>();
defineExpose({
    ...toExpose,
});
const { class: cls, style, ...attrs } = useAttrs();
</script>

<template>
    <div class="w-full flex flex-col" :class="props.rootClass">
        <div class="w-full select-none">
            <!-- label -->
            <span
                v-if="props.label !== ''"
                class="pb-1 pl-1 text-sm font-bold"
                :class="{ 'text-red-600': error !== '' }"
            >
                {{ props.label }}
            </span>
            <!-- text field -->
            <div
                class="px-2 rounded-sm border border-gray-300 focus-within:ring-1 flex justify-start items-center aria-disabled:bg-slate-900 aria-disabled:bg-opacity-10"
                :class="{
                    [`focus-within:border-${props.accent} focus-within:ring-${props.accent}`]:
                        error === '',
                    'border-red-600 text-red-600 focus-within:border-red-600 focus-within:ring-red-600':
                        error !== '',
                    'bg-transparent ': props.transparent,
                    [`${cls || ''}`]: !props.disabled,
                }"
                :style="!disabled ? convertStyle(style as any) : ''"
                v-bind="attrs"
                :aria-disabled="disabled"
            >
                <!-- icon slot -->
                <div v-if="$slots.icon || props.icon" class="pl-1 pr-3">
                    <slot name="icon">
                        <UiFontAwesomeIcon :icon="props.icon" />
                    </slot>
                </div>
                <!-- input -->
                <input
                    class="bg-transparent outline-none w-full my-2"
                    :class="{
                        'placeholder-red-600': error !== '',
                    }"
                    :type="type === 'password' ? (passwordVisible ? 'text' : 'password') : type"
                    :placeholder="props.placeholder"
                    v-model="value"
                    :disabled="disabled"
                />
                <!-- change the visibility of the password -->
                <div v-if="type === 'password'" class="pl-3">
                    <UiIconButton size="xs" @click="passwordVisible = !passwordVisible">
                        <UiFontAwesomeIcon
                            :icon="passwordVisible ? faEye : faEyeSlash"
                        ></UiFontAwesomeIcon>
                    </UiIconButton>
                </div>
            </div>
        </div>
        <div
            v-if="props['show-error-always'] || (error && error != '')"
            class="w-full px-1 pt-1 text-sm text-red-600"
        >
            {{ error }}
        </div>
    </div>
</template>
