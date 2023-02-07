<template>
    <UiCard size="width: clamp(300px, 90%, 1000px)">
        <template #default>
            <div class="p-4 flex flex-col gap-4">
                <div class="bg-gray-200 rounded-md flex items-center gap-2 p-2">
                    <UiIconButton
                        v-ripple
                        :icon="faArrowLeft"
                        :disabled="path.length === 0"
                        @click="path.length !== 0 && $emit('back')"
                    />
                    <div v-for="item in pathArray">
                        {{ item }}
                    </div>
                    <UiSpacer />
                    <!-- <UiIconButton v-ripple :icon="faPen" />
                    <UiIconButton v-ripple :icon="faTrash" /> -->

                    <UiIconButton v-ripple :icon="faPlus" @click="$emit('create-file')" />
                </div>
                <div class="flex flex-row flex-wrap">
                    <UiTextButton
                        v-for="file in files"
                        v-ripple
                        class="rounded-md min-w-[8rem]"
                        style="text-transform: none"
                        vertical
                        @click="
                            file.filetype === 'directory'
                                ? $emit('open-directory', file.filename)
                                : $emit('open-file', file.filename)
                        "
                    >
                        <template #prepend-icon>
                            <!-- <UiFontAwesomeIcon
                                :icon="getFileIcon(file.filetype)"
                                class="w-[40px] h-[40px]"
                                size="2x"
                            /> -->

                            <UiFileIcon :type="file.filetype" class="h-[29.96px]" size="2x"/>
                        </template>

                        {{ file.filename }}
                    </UiTextButton>
                </div>
            </div>
        </template>
    </UiCard>
</template>

<script setup lang="ts">
import { faArrowLeft, faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
    path: {
        type: Array as () => string[],
        required: true,
    },
    files: {
        type: Array as () => { filename: string; filetype: string }[],
        required: true,
    },
});

const pathArray = computed<string[]>(() => {
    const arr: string[] = ['~~', '/'];

    for (const item of props.path) arr.push(item, '/');

    return arr;
});

defineEmits<{
    (e: 'back'): void;
    (e: 'open-directory', name: string): void;
    (e: 'open-file', name: string): void;
    (e: 'create-directory'): void;
    (e: 'create-file'): void;
    (e: 'rename'): void;
    (e: 'delete'): void;
}>();
</script>

<style scoped></style>
