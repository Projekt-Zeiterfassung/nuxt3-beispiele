<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { useAttrs } from 'vue';
defineProps({
    count: { type: Number, required: false },
    dot: { type: Boolean, default: false },
    ping: { type: Boolean, default: false },
    badges: {
        type: Array as () => { text: string; ping?: boolean; attrs?: Record<string, any> }[],
        required: false,
    },
    badge: {
        type: Object as () => { text: string; ping?: boolean; attrs?: Record<string, any> },
        required: false,
    },
});
const attrs = useAttrs();
</script>

<template>
    <div class="relative">
        <slot name="target" />
        <div
            class="absolute top-0 right-0 translate-y-[-50%] flex flex-row justify-center items-center"
        >
            <div
                v-if="dot"
                class="badge dot translate-x-[50%]"
                :class="{
                    'badge-ping': ping,
                }"
                v-bind="attrs"
                style="--badge-ping-scale: 2"
            ></div>

            <div
                v-else-if="count === 1 || (badge && !badges)"
                class="badge"
                :class="{
                    'badge-ping': badge?.ping,
                }"
                v-bind="{ ...badge?.attrs, ...attrs }"
            >
                <slot> {{ badge?.text }} </slot>
            </div>
            <div v-else class="w-full flex flex-row gap-2">
                <div
                    v-for="index in badges?.length"
                    class="badge"
                    :class="{
                        'badge-ping': badges && badges[index - 1]?.ping,
                    }"
                    v-bind="(badges && badges[index - 1]?.attrs) || {}"
                >
                    <slot :name="`badge-${index}`">
                        {{ (badges && badges[index - 1]?.text) || '' }}
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
.badge
    @apply text-xs font-semibold rounded-full py-1 px-2
.dot
    @apply h-3 w-3 p-0
    *
        @apply hidden
@keyframes badge-ping
    75%, 100%
        transform: scale(var(--badge-ping-scale, 1.5))
        opacity: 0
.badge-ping
    @apply relative
    &::before
        content: ''
        background: inherit
        opacity: .75
        z-index: -1
        @apply absolute top-0 left-0 w-full h-full rounded-full
        animation: badge-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite
</style>
