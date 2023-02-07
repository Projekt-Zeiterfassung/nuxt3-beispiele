<template>
    <div class="h-screen w-screen flex justify-center p-8">
        <div class="w-[clamp(300px,_70%,_800px)] flex flex-col gap-10">
            <div class="flex flex-row items-end gap-3">
                <div class="flex-grow text-5xl font-bold">Tasks</div>
                <UiButton
                    v-ripple
                    class="bg-emerald-500"
                    dark
                    :prepend-icon="faPlus"
                    @click="navigateTo('/create')"
                >
                    Neue Task erstellen
                </UiButton>
                <UiButton
                    v-ripple
                    class="bg-primary"
                    dark
                    :prepend-icon="faRefresh"
                    @click="refresh"
                >
                    Neu laden
                </UiButton>
            </div>
            <div v-if="pending">Tasks laden ...</div>
            <div v-else class="w-full flex-grow flex items-center flex-col gap-5 overflow-y-auto">
                <Task
                    v-for="task in tasks"
                    :id="task.id"
                    :text="task.data.text"
                    :done="task.data.done"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';

const { pending, data: tasks, refresh } = useLazyFetch('/api/tasks');
</script>

<style scoped></style>
