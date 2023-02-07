<script lang="ts">
export default {
    name: 'f-icon-button',
    inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { useAttrs } from 'vue';
import { useOverlay } from '~/assets/composables';
import { convertStyle } from '~/assets/functions';
import FontAwesomeIcon from './FontAwesomeIcon';
const { disabled, size, icon } = defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String as () => 'xs' | 'x' | 'xl' | 'xxl',
        default: 'x',
    },
    icon: {
        type: Object as () => string | object | string[],
        required: false,
    },
});
useOverlay();
function getSize(): '36px' | '40px' | '44px' | '48px' {
    switch (size) {
        case 'xs':
            return '36px';
        case 'xl':
            return '44px';
        case 'xxl':
            return '48px';
        case 'x':
        default:
            return '40px';
    }
}
const { class: cls, style, ...attrs } = useAttrs();
</script>

<template>
    <button
        class="rounded-full d-button"
        :class="{
            [cls as string || '']: !disabled,
            'text-gray-400 pointer-events-none': disabled,
        }"
        :style="`height: ${getSize()}; width: ${getSize()};${!disabled && style ? convertStyle(style as any) : ''}`"
        v-bind="attrs"
        solid="false"
    >
        <slot>
            <FontAwesomeIcon :icon="icon" />
        </slot>
    </button>
</template>
