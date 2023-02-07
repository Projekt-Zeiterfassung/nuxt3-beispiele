<template>
    <div>
        <span v-if="label != ''" class="px-1 pb-1 text-sm font-bold">{{ label }}</span>
        <div
            class="group rounded-sm border border-gray-300 focus-within:ring-1 focus-within:ring-inset"
            :class="{
                [`focus-within:border-${props.accent} focus-within:ring-${props.accent}`]:
                    error === '',
                'border-red-600 text-red-600 focus-within:border-red-600 focus-within:ring-red-600':
                    error !== '',
            }"
        >
            <div
                class="border-b border-gray-300 flex p-1 divide-x"
                :class="{
                    [`group-focus-within:border-${props.accent}`]: error === '',
                    'border-red-600 group-focus-within:border-red-600 group-focus-within:ring-red-600':
                        error !== '',
                }"
            >
                <div class="flex pr-1">
                    <UiEditorToggleButton
                        :accent="error === '' ? accent : 'red-600'"
                        @click="editor.chain().focus().toggleBold().run()"
                        :is-active="editor.isActive('bold')"
                    >
                        <UiFontAwesomeIcon :icon="faBold" />
                    </UiEditorToggleButton>
                    <UiEditorToggleButton
                        :accent="error === '' ? accent : 'red-600'"
                        @click="editor.chain().focus().toggleItalic().run()"
                        :is-active="editor.isActive('italic')"
                    >
                        <UiFontAwesomeIcon :icon="faItalic" />
                    </UiEditorToggleButton>
                    <UiEditorToggleButton
                        :accent="error === '' ? accent : 'red-600'"
                        @click="editor.chain().focus().toggleStrike().run()"
                        :is-active="editor.isActive('strike')"
                    >
                        <UiFontAwesomeIcon :icon="faStrikethrough" />
                    </UiEditorToggleButton>
                    <UiEditorToggleButton
                        :accent="error === '' ? accent : 'red-600'"
                        @click="
                            // @ts-ignore
                            editor.chain().focus().toggleUnderline().run()
                        "
                        :is-active="editor.isActive('underline')"
                    >
                        <UiFontAwesomeIcon :icon="faUnderline" />
                    </UiEditorToggleButton>
                </div>

                <div class="flex px-1">
                    <UiEditorToggleButton
                        :accent="error === '' ? accent : 'red-600'"
                        @click="
                            // @ts-ignore
                            editor.chain().focus().toggleOrderedList().run()
                        "
                        :is-active="editor.isActive('orderedList')"
                    >
                        <UiFontAwesomeIcon :icon="faListOl" />
                    </UiEditorToggleButton>
                    <UiEditorToggleButton
                        :accent="error === '' ? accent : 'red-600'"
                        @click="
                            // @ts-ignore
                            editor.chain().focus().toggleBulletList().run()
                        "
                        :is-active="editor.isActive('bulletList')"
                    >
                        <UiFontAwesomeIcon :icon="faListUl" />
                    </UiEditorToggleButton>
                    <UiEditorToggleButton
                        :accent="error === '' ? accent : 'red-600'"
                        @click="
                            // @ts-ignore
                            editor.chain().focus().toggleTaskList().run()
                        "
                        :is-active="editor.isActive('taskList')"
                    >
                        <UiFontAwesomeIcon :icon="faListCheck" />
                    </UiEditorToggleButton>
                </div>

                <!-- <div class="flex px-1">
                <editor-button
                    @click="
                        // @ts-ignore
                        editor.chain().focus().toggleCode().run()
                    "
                    :is-active="editor.isActive('code')"
                >
                    <UiFontAwesomeIcon :icon="faCode" />
                </editor-button>
            </div> -->
            </div>
            <div class="w-full">
                <EditorContent class="editor-field" :editor="(editor as unknown as Editor)" />
            </div>
        </div>
        <div
            v-if="props['show-error-always'] || (error && error != '')"
            class="w-full px-1 pt-1 text-sm text-red-600"
        >
            {{ error }}
        </div>
    </div>
</template>

<style lang="sass" scoped>
// .markdown-body
//     @apply bg-transparent

.editor-field::v-deep(.ProseMirror)
    outline: none
    @apply px-3 py-2 min-h-[112px] max-h-[208px] overflow-auto
    ul,
    ol
        display: block
        list-style-position: inside !important
        li *
            display: inline-block

        &[data-type='taskList']
            list-style: none
            padding-left: 0px
            li
                label
                    margin-right: 10px

    ol
        list-style: decimal

    ul
        list-style: disc

    pre
        @apply bg-gray-100 py-3 px-5 rounded-sm
</style>

<script setup lang="ts">
import { faBold, faItalic, faStrikethrough, faUnderline, faCode, faListOl, faListUl, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import CodeBlock from '@tiptap/extension-code-block';
import { createMarkdownEditor } from 'tiptap-markdown';
import { useFormField, useFormFieldEmit, useFormFieldProps } from '~~/assets/composables';

const props = defineProps({
    ...useFormFieldProps(),
    placeholder: {
        type: String,
        default: '',
    },
    transparent: {
        type: Boolean,
        default: true,
    },
});
const { error, toExpose, value } = useFormField<string>(props, '');
defineEmits<useFormFieldEmit>();
defineExpose({
    ...toExpose,
});
const { class: cls, style, ...attrs } = useAttrs();

const editor = new (createMarkdownEditor(Editor))({
    extensions: [
        StarterKit.configure({
            codeBlock: false,
        }),
        Underline,
        Link,
        TaskList,
        TaskItem,
        CodeBlock.configure({
            languageClassPrefix: 'lang-',
        }),
        Image.configure({
            allowBase64: true,
        }),
    ],
    content: '',
    onUpdate: () => onEditorValueUpdated(),
});

function onEditorValueUpdated() {
    value.value = editor.getMarkdown();
}

onMounted(() => {
    editor.setOptions({ content: value.value });
});
</script>
