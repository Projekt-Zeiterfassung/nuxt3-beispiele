<template>
    <NuxtLayout name="center-screen">
        <UiCard class="p-4 w-[clamp(300px,_70%,_500px)]" gap="1rem">
            <template #header>
                <div class="text-xl font-bold">Neue Task erstellen</div>
            </template>
            <template #default>
                <UiTextField label="Text" accent="primary" v-model="text" />
            </template>
            <template #actions>
                <UiButton v-ripple class="bg-primary" dark @click="create">Erstellen</UiButton>
                <UiSpacer />
                <UiTextButton v-ripple dark @click="navigateTo('/')">Zurück</UiTextButton>
            </template>
        </UiCard>
    </NuxtLayout>
</template>

<script setup lang="ts">
const text = ref('');

async function create() {
    const { error } = await useLazyFetch('/api/task', {
        method: 'put',
        body: {
            text: text.value,
        },
    });

    if (error.value) return alert(error.value.message);

    navigateTo('/')
}
</script>
