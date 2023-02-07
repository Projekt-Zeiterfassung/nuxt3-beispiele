<script lang="ts" setup>
import { faBug, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { computed, ref } from 'vue';
import { NavApp } from '~~/assets/types';
import { VOnClickOutside } from '@vueuse/components';

const props = defineProps({
    navMenuOpen: {
        type: Boolean,
        required: true,
    },
    navHeight: {
        type: String,
        default: '56px',
    },
    apps: {
        type: Array as () => NavApp[],
        default: () => [],
    },
});

const searchValue = ref('');
const apps = computed(() =>
    props.apps
        .filter(app => {
            if (searchValue.value == '') return true;
            return RegExp(searchValue.value, 'gi').test(app.name.replaceAll(/\s*/g, ''));
        })
        .sort((a, b) => a.name.localeCompare(b.name)),
);

const emit = defineEmits<{
    (e: 'changeStateOfNavMenu'): void;
}>();

const menu = ref();

onClickOutside(menu, () => props.navMenuOpen && emit('changeStateOfNavMenu'));
</script>

<template>
    <transition name="nav-menu-fade">
        <UiCard ref="menu" v-show="navMenuOpen" class="nav-app-menu">
            <template #header>
                <UiTextField
                    v-model="searchValue"
                    placeholder="Nach einer App suchen"
                    :icon="faMagnifyingGlass"
                    class="mb-4"
                />
            </template>
            <template #default>
                <div class="w-full h-full grid grid-rows-1 sm:grid-cols-2 gap-4">
                    <UiButton v-ripple class="bg-amber-600 sm:col-span-2" dark block vertical>
                        <template #prepend-icon>
                            <UiFontAwesomeIcon :icon="faBug" size="2x" />
                        </template>
                        Fehler melden
                    </UiButton>

                    <UiBadge v-for="app in apps" :badges="app.badges || []">
                        <template #target>
                            <UiTextButton v-ripple block vertical v-bind="app.props">
                                <template #prepend-icon>
                                    <div
                                        v-if="typeof app.icon === 'string'"
                                        v-html="app.icon"
                                        class="h-[150px] w-[150px]"
                                    ></div>
                                    <UiFontAwesomeIcon v-else :icon="app.icon" />
                                </template>
                                {{ app.name }}
                            </UiTextButton>
                        </template>
                    </UiBadge>
                </div>
            </template>
        </UiCard>
    </transition>
</template>

<style lang="sass">
.nav-app-menu
    max-height: 80%
    width: clamp(330px, 90%, 700px)
    margin-top: calc(v-bind(navHeight) + 1.25rem)
    @apply fixed top-0 left-0 p-4 ml-5 overflow-auto z-20 backdrop-filter backdrop-blur-sm bg-opacity-70 opacity-100
.nav-menu-fade-enter-active,
.nav-menu-fade-leave-active
    transition: all 0.3s ease-out
.nav-menu-fade-enter-from,
.nav-menu-fade-leave-to
    transform: translateX(-110%)
    @apply bg-opacity-0 opacity-0
</style>
