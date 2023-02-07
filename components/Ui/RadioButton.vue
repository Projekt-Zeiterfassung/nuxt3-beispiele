<template>
    <div>
        <!-- <input type="radio" :name="name" :id="id" :value="label" /> -->
        <div class="inline-flex items-center">
            <UiIconButton
                v-show="label === modelValue"
                @click="$emit('update', label)"
                :class="[color || '']"
            >
                <UiFontAwesomeIcon
                    :icon="faCircleCheck"
                    swap-opacity
                    style="--fa-primary-color: transparent"
                />
            </UiIconButton>

            <UiIconButton v-show="label !== modelValue" @click="$emit('update', label)">
                <UiFontAwesomeIcon :icon="faCircle" />
            </UiIconButton>

            {{ label }}
        </div>
    </div>
</template>

<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { faCircleCheck, faCircle } from '@fortawesome/free-solid-svg-icons';

defineProps<{
    label: string;
    modelValue: string;
    color?: string;
}>();

defineEmits<{
    (e: 'update', value: string): void;
}>();
</script>
