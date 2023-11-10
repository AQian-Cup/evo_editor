<template>
  <editor-content :editor="editor" min-h-full p-2 />
</template>

<script lang="ts" setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import Image from '@tiptap/extension-image';

const editor = useEditor({
  extensions: [StarterKit, CharacterCount, Image],
  content: '',
});
defineExpose({
  editor,
});
</script>
<style scoped></style>
