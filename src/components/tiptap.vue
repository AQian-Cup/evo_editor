<template>
  <editor-content :editor="editor" min-h-full p-2 />
</template>

<script lang="ts" setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import 'highlight.js/styles/github-dark.min.css';

const lowlight = createLowlight(common);
const editor = useEditor({
  extensions: [
    StarterKit.configure({
      codeBlock: false,
    }),
    CharacterCount,
    Image,
    CodeBlockLowlight.configure({
      lowlight,
    }),
  ],
  content: '',
});
defineExpose({
  editor,
});
</script>
<style scoped></style>
