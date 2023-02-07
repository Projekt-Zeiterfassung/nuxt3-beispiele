<template>
    <div class="markdown-body" v-html="rendered"></div>
</template>

<script setup lang="ts">
const { value } = defineProps({
    value: {
        type: String,
        required: true,
    },
});

const converter = new mdParser();

const rendered = computed(() => converter.makeHtml(value));
</script>

<style lang="sass">
.markdown-body
    @apply font-display
    ul
        @apply list-disc
    ol
        @apply list-decimal
</style>
