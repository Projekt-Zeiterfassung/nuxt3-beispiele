<script lang="ts">
export default {
    name: 'f-text-button',
    inheritAttrs: false,
    components: { FontAwesomeIcon },
};
</script>

<script setup lang="ts">
import { useAttrs } from 'vue';
import { useOverlay } from '~/assets/composables';
import { convertStyle } from '~/assets/functions';
import FontAwesomeIcon from './FontAwesomeIcon';
const { block, disabled, prependIcon, appendIcon, gap, vertical } = defineProps({
    block: {
        type: Boolean,
        default: false,
    },
    vertical: {
        type: Boolean,
        default: false,
    },
    gap: {
        type: String,
        default: '0.5rem',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    prependIcon: {
        type: Object as () => string | object | string[],
        required: false,
    },
    appendIcon: {
        type: Object as () => string | object | string[],
        required: false,
    },
});
useOverlay();
const { class: cls, style, ...attrs } = useAttrs();
</script>

<template>
    <button
        class="py-2 px-3 text-sm rounded-sm d-button"
        :class="[
            {
                'w-full': block,
                'max-w-min': !block,
                'flex-col': vertical,
                'flex-row': !vertical,
                'text-gray-400 pointer-events-none': disabled,
                [`${cls || ''}`]: !disabled,
            },
        ]"
        :style="`gap: ${gap};` + (!disabled ? convertStyle(style as any) : '')"
        v-bind="attrs"
        solid="false"
    >
        <span v-if="$slots['prepend-icon'] || prependIcon">
            <slot name="prepend-icon">
                <FontAwesomeIcon :icon="prependIcon" />
            </slot>
        </span>
        <span>
            <slot />
        </span>
        <span v-if="$slots['append-icon'] || appendIcon">
            <slot name="append-icon">
                <FontAwesomeIcon :icon="prependIcon" />
            </slot>
        </span>
    </button>
</template>
