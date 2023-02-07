<script lang="ts">
export default {
    name: 'f-card',
    inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { useAttrs } from 'vue';
const { gap, actionsgap, actionsspacebetween, flat, rounded, width, height, size } = defineProps({
    gap: {
        type: String,
        default: '0',
    },
    actionsgap: {
        type: String,
        default: '0',
    },
    actionsspacebetween: {
        type: Boolean,
        default: false,
    },
    flat: {
        type: Boolean,
        default: false,
    },
    rounded: {
        type: Boolean,
        default: true,
    },
    width: {
        type: String,
        default: '',
    },
    height: {
        type: String,
        default: '',
    },
    /**
     * @deprecated
     */
    size: {
        type: String,
        default: '',
    },
});
const attrs = useAttrs();
</script>

<template>
    <div
        :style="`width: ${width}; height: ${height}; gap: ${gap};${size};`"
        class="bg-white flex flex-col"
        :class="{
            'shadow-md': !flat,
            'rounded-md': rounded,
        }"
        v-bind="($slots.header || $slots.actions) && attrs"
    >
        <div>
            <slot name="header"></slot>
        </div>
        <div v-bind="!$slots.header && !$slots.actions && attrs" class="grow">
            <slot></slot>
        </div>
        <div
            class="flex flex-row-reverse items-center"
            :class="{
                'justify-between': actionsspacebetween,
            }"
            :style="`gap: ${actionsgap};`"
        >
            <slot name="actions"></slot>
        </div>
    </div>
</template>
