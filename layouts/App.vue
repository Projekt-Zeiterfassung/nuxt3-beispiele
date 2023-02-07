<template>
    <UiApp>
        <template #nav-bar="{ props }">
            <UiNavBar
                v-bind="props"
                :app-title="appTitle"
                :app-color="appColor"
                :app-font-color="appFontColor"
                :app-links="appLinks"
            />
        </template>
        <template #nav-menu="{ props }"> <UiNavAppMenu v-bind="props" :apps="apps" /> </template>
        <NuxtPage />
    </UiApp>
</template>

<script lang="ts" setup>
const uiStore = useUiStore();

const appTitle = computed(() => uiStore.getAppTitle);
const appColor = computed(() => uiStore.getAppColor);
const appFontColor = computed(() => uiStore.getAppFontColor);

watch(() => appColor, console.log);

const apps = computed(() => uiStore.getApps);
const appLinks = computed(() => uiStore.getLinks);
</script>
