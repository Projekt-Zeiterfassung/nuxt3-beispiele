<script setup lang="ts">
import { useOverlay } from '~~/assets/composables';
import type { accent } from '~~/assets/functions';

const { isActive } = defineProps({
    accent: {
        type: String as () => accent,
        default: 'primary',
    },
    isActive: {
        default: false,
        type: Boolean,
    },
});
useOverlay();
</script>

<template>
    <button
        v-ripple
        class="relative inline-flex justify-center items-center border-none rounded-sm uppercase font-semibold tracking-wide focus:outline-none d-button-icon"
        :class="[isActive ? `text-${accent} bg-${accent} bg-opacity-10` : 'text-gray-800']"
        style="height: 36px; width: 36px"
    >
        <span>
            <slot />
        </span>
    </button>
</template>
