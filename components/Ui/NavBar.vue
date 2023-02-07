<script lang="ts">
export default {
    name: 'f-nav-bar',
};
</script>

<script lang="ts" setup>
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from '~~/assets/types';
const props = defineProps({
    controlNavMenu: {
        type: Boolean,
        default: false,
    },
    navMenuOpen: {
        type: Boolean,
        default: false,
    },
    navIcon: Object as () => string | object | string[],
    darkModeSwitch: {
        type: Boolean,
        default: false,
    },
    appColor: {
        type: String,
        required: true,
    },
    appFontColor: {
        type: String,
        required: true,
    },
    appTitle: {
        type: String,
        default: '',
    },
    appLinks: {
        type: Array as () => NavLink[],
        default: () => [],
    },
});

const toggleDarkmode = () => {
    throw 'Not implemented';
};

const searchValue = computed({
    get() {
        throw 'Not implemented';
    },
    set() {
        throw 'Not implemented';
    },
});

const emit = defineEmits<{
    (e: 'changeStateOfNavMenu'): void;
}>();
</script>

<template>
    <nav
        class="fixed top-0 left-0 w-full h-[56px] z-20 shadow-2xl inline-flex items-center select-none"
        :class="[appColor, appFontColor]"
    >
        <slot name="nav-icon" :props="{ onClick: () => emit('changeStateOfNavMenu') }">
            <div
                v-ripple
                class="cursor-pointer d-button w-[80px]"
                style="height: 100%"
                solid="false"
                @click="emit('changeStateOfNavMenu')"
            >
                <UiFontAwesomeIcon
                    :icon="props.navMenuOpen ? faXmark : props.navIcon || faBars"
                    :swap-opacity="props.navMenuOpen"
                    size="lg"
                    style="font-size: 1.5rem"
                />
                <div class="overlay"></div>
            </div>
            <!-- <UiIconButton v-ripple dark @click="emit('changeStateOfNavMenu')">
                <UiFontAwesomeIcon
                    :icon="props.navMenuOpen ? faXmark : props.navIcon || faBars"
                    :swap-opacity="props.navMenuOpen"
                    size="lg"
                />
            </UiIconButton> -->
        </slot>
        <div
            v-for="link in appLinks"
            v-ripple
            class="cursor-pointer d-button w-[56px]"
            style="height: 100%"
            v-bind="link.props || {}"
            solid="false"
        >
            <UiFontAwesomeIcon :icon="link.icon" size="lg" v-bind="link.iconProps || {}" />
            <div class="overlay"></div>
        </div>
        <!-- <UiIconButton v-for="link in appLinks" v-ripple dark class="ml-2" v-bind="link.props || {}">
            <UiFontAwesomeIcon :icon="link.icon" size="lg" v-bind="link.iconProps || {}" />
        </UiIconButton> -->
        <div
            class="absolute top-0 h-full py-2 flex justify-center items-center"
            style="left: 50%; transform: translateX(-50%)"
        >
            <slot name="header">
                <div class="font-header text-2xl">{{ appTitle }}</div>
            </slot>
        </div>
        <!-- // TODO: searchbar and darkmode switch -->
    </nav>
</template>
