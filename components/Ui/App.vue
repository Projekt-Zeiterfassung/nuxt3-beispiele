<script lang="ts">
export default {
    name: 'f-app',
    inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { nextTick, ref, useAttrs } from 'vue';
const { useDarkMode } = defineProps({
    /**
     * If the value is false the darkmode gobally disabled
     */
    useDarkMode: { type: Boolean, default: false },
    darkMode: { type: Boolean, default: false },
});
const navMenuOpen = ref(false);
const navMenuOpenLocked = ref(false);

const changeStateOfNavMenu = () => {
    if (navMenuOpenLocked.value) return;

    navMenuOpenLocked.value = true;
    navMenuOpen.value = !navMenuOpen.value;
    setTimeout(() => (navMenuOpenLocked.value = false), 100);
};

const closeNavMenu = () => {
    nextTick(() => navMenuOpen.value && (navMenuOpen.value = false));
};

const attrs = useAttrs();
</script>

<template>
    <div :class="{ dark: useDarkMode && darkMode }">
        <div
            class="font-display text-gray-900 bg-gray-50 flex justify-center items-center overflow-hidden py-3"
            :class="{ 'mt-14': $slots['nav-bar'], 'h-screen max-h-screen': !$slots['nav-bar'] }"
            :style="$slots['nav-bar'] ? 'min-height: calc(100vh - 3.5rem)' : ''"
            v-bind="attrs"
        >
            <!-- nav -->
            <slot
                name="nav-bar"
                :props="{
                    closeNavMenu,
                    onChangeStateOfNavMenu: changeStateOfNavMenu,
                    /*'nav-menu-open':*/ navMenuOpen,
                }"
            />
            <slot
                name="nav-menu"
                :props="{
                    closeNavMenu,
                    onChangeStateOfNavMenu: changeStateOfNavMenu,
                    /*'nav-menu-open':*/ navMenuOpen,
                }"
            />
            <slot />
        </div>
    </div>
</template>
