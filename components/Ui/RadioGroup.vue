<template>
    <div>
        <span
            v-if="props.label !== ''"
            class="pb-1 pl-1 text-sm font-bold"
            :class="{ 'text-red-600': error !== '' }"
        >
            {{ props.label }}
        </span>
        <div
            :class="[
                'flex',
                {
                    'flex-row': props.inline,
                    'flex-col': !props.inline,
                },
            ]"
        >
            <slot
                :props="{
                onUpdate: (v: string) => (value = v),
                modelValue: value,
            }"
                name="default"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFormField, useFormFieldProps } from '~/assets/composables';
import type { useFormFieldEmit } from '~/assets/composables';

const props = defineProps({
    ...useFormFieldProps(),
    label: {
        type: String,
        default: '',
    },
    inline: {
        type: Boolean,
        default: false,
    },
});

const { error, toExpose, value } = useFormField<string>(props, '');

defineEmits<useFormFieldEmit>();

defineExpose({
    ...toExpose,
});

// const { class: cls, style, ...attrs } = useAttrs();
</script>
