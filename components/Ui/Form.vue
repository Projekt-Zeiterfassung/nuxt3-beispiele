<script lang="ts">
export default {
    name: 'f-form',
};
</script>

<script setup lang="ts">
import { ComponentInternalInstance } from 'vue';

const { disabled } = defineProps({
    valid: {
        type: Boolean,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits<{ (event: 'update:valid', value: boolean): void }>();
const formFields: ComponentInternalInstance[] = [];
const validFields: Record<string, boolean> = reactive({});
const valid = ref(false);

watch(validFields, () => {
    let result = true;
    for (const key in validFields) {
        if (result && validFields[key]) continue;
        result = false;
        break;
    }
    valid.value = result;
    emit('update:valid', result);
});

defineExpose({
    registerFormField: (instance: ComponentInternalInstance, value = false) => {
        formFields.push(instance);
        validFields[String(instance.uid)] = value;
    },
    updateFormField: (instance: ComponentInternalInstance, value: boolean) => {
        for (const key in validFields) if (key == String(instance.uid)) validFields[key] = value;
    },
    validate: () => {
        for (const field of formFields) field.exposed?.validate();
    },
});
</script>

<template>
    <div>
        <slot :attrs="{ disabled }"></slot>
    </div>
</template>
