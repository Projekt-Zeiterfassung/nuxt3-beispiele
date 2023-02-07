<template>
    <div class="w-full flex flex-row gap-2 justify-center items-center p-4 bg-white rounded-lg shadow-lg">
        <div class="flex-grow font-bold text-lg">{{ text }}</div>
        <UiIconButton v-if="!done" v-ripple :icon="faCheck" class="text-green-600" />
        <UiIconButton v-else v-ripple :icon="faClose" class="text-red-600" />
        <UiIconButton v-ripple :icon="faTrash" class="text-gray-600" />
    </div>
</template>

<script setup lang="ts">
import { faCheck, faClose, faTrash } from '@fortawesome/free-solid-svg-icons';

defineProps<{
    id: string
    text: string;
    done?: boolean;
}>();
</script>
