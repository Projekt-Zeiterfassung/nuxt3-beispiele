<template>
    <div>
        <!-- label -->
        <span
            v-if="props.label !== ''"
            class="pb-1 pl-1 text-sm font-bold"
            :class="{ 'text-red-600': error !== '' }"
        >
            {{ props.label }}
        </span>
        <!-- Dropzone -->
        <div
            ref="dropzone"
            class="min-h-[7.5rem] w-full p-4 border rounded-md grid gap-2 grid-cols-[minmax(48px,_1fr)_minmax(278px,_1fr)] select-none cursor-pointer"
            :class="{
                'items-center': value.length == 0,
                'items-start': value.length > 0,
                'border-gray-300': !isOverDropZone,
                [`border-${props.accent}`]: isOverDropZone,
                [`ring-1 ring-${props.accent}`]: isOverDropZone,
            }"
            @click="openFileDialog"
        >
            <UiCard
                v-if="fileError != ''"
                @click.stop=""
                class="col-span-2 p-4 border-l-4 border-red-600 bg-red-50"
            >
                <template #header> </template>
                <template #default>
                    <div class="flex flex-row items-center">
                        <UiFontAwesomeIcon
                            :icon="faWarning"
                            class="w-[40px] h-[40px] mr-4 text-red-600"
                            size="2x"
                        />
                        <div>{{ fileError }}</div>
                    </div>
                </template>
            </UiCard>

            <div v-if="value.length == 0" class="text-center text-gray-500 row-span-3">
                <UiFontAwesomeIcon :icon="faUpload" size="3x" />
            </div>
            <div v-if="value.length == 0" class="text-center text-gray-500">
                Dateien hier ablegen
            </div>
            <div v-if="value.length == 0" class="text-center text-gray-500">oder</div>
            <div v-if="value.length == 0" class="text-center text-gray-500">
                Klicken um Dateien auszuwählen
            </div>

            <div
                class="col-span-2 w-full bg-gray-100 p-2 rounded-sm flex flex-row items-center cursor-default"
                v-for="file in value"
                @click.stop=""
            >
                <UiFontAwesomeIcon
                    :icon="getFileIcon(file.type)"
                    class="w-[40px] h-[40px] mr-4"
                    size="2x"
                />
                <div>{{ file.name }}</div>
                <UiSpacer />
                <UiIconButton
                    v-ripple
                    :icon="faXmark"
                    class="text-red-500"
                    @click="removeFile(file.name)"
                />
            </div>

            <div v-if="value.length > 0" class="col-span-2 text-center text-gray-500">
                Weitere Dateien hier ablegen oder klicken
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFormField, useFormFieldProps } from '~/assets/composables';
import type { useFormFieldEmit } from '~/assets/composables';
import { faUpload, faWarning, faXmark } from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
    ...useFormFieldProps<File[]>(),
});

const { error, toExpose, value } = useFormField<File[]>(props, []);
defineEmits<useFormFieldEmit<File[]>>();
defineExpose({
    ...toExpose,
});

const dropzone = ref<HTMLDivElement>();

const { isOverDropZone } = useDropZone(dropzone, addFiles);

const fileError = ref('');

function openFileDialog() {
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = () => {
        if (!input.files) return;
        addFiles(Array.from(input.files));
    };
    input.click();
}

function addFiles(files: File[] | null) {
    if (!files) return;
    fileError.value = '';

    const tmp = [...value.value, ...files];

    if (new Set(tmp.map(v => v.name)).size != tmp.length) {
        fileError.value = 'Dateien mit dem gleichen Dateinamen können nicht hochgeladen werden!';
        return;
    }

    value.value = tmp;
}

async function removeFile(filename: string) {
    const tmp = value.value.filter(v => v.name != filename);

    await nextTick(() => (value.value = []));

    await nextTick(() => (value.value = tmp));
}
</script>
