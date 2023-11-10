<template>
  <div
    flex="~ col"
    relative
    h-full
    overflow-hidden
    border-4
    border-zinc-8
    rounded-4
  >
    <editor-menu>
      <editor-menu-button
        v-for="menuButton in menuButtonMap.values()"
        :icon="menuButton.icon"
        @click="menuButton.onClick"
      ></editor-menu-button>
    </editor-menu>
    <div h-1 bg-zinc-8></div>
    <scroll-bar cursor-text @click="focus">
      <tiptap ref="tiptapRef"></tiptap>
    </scroll-bar>
    <div
      :class="canOutput ? '' : '-translate-x-full'"
      h-10
      w-full
      flex
      transform-gpu
      cursor-pointer
      items-center
      justify-end
      bg-zinc-8
      px-2
      text-white
      transition
      space-x-2
      @click="() => copy(tiptapRef?.editor?.getHTML() || '')"
    >
      <span>点此获取富文本至剪贴板</span>
      <div i-ri-arrow-right-double-fill></div>
    </div>
    <editorMedia
      v-model="isUpload"
      :type="uploadType"
      @submit="upload"
    ></editorMedia>
  </div>
</template>
<script lang="ts" setup>
import editorMenu from './components/editor/menu/index.vue';
import editorMenuButton from './components/editor/menu/button/index.vue';
import editorMedia from './components/editor/media/index.vue';
import scrollBar from './components/scroll-bar.vue';
import tiptap from './components/tiptap.vue';
import { computed, ref } from 'vue';
import { useClipboard } from '@vueuse/core';
import {
  useBold,
  useItalic,
  useStrike,
  useHorizontalRule,
  useCode,
  useCodeBlock,
  useBlockQuote,
  useHistory,
  useEditorFocus,
} from './utils';

const uploadType = ref('image');
const isUpload = ref(false);
const tiptapRef = ref<InstanceType<typeof tiptap> | null>(null);
const useUpload = (type = 'image') => {
  uploadType.value = type;
  isUpload.value = true;
};
const upload = (url: string) => {
  tiptapRef.value?.editor?.commands.setImage({
    src: url,
  });
};
const menuButtonMap = new Map([
  [
    'bold',
    {
      icon: 'i-ri-bold',
      onClick: () => {
        useBold(tiptapRef.value?.editor);
      },
    },
  ],
  [
    'italic',
    {
      icon: 'i-ri-italic',
      onClick: () => {
        useItalic(tiptapRef.value?.editor);
      },
    },
  ],
  [
    'strike',
    {
      icon: 'i-ri-strikethrough',
      onClick: () => {
        useStrike(tiptapRef.value?.editor);
      },
    },
  ],
  [
    'i-ri-bar-chart-horizontal-fill',
    {
      icon: 'i-ri-bar-chart-horizontal-fill',
      onClick: () => {
        useHorizontalRule(tiptapRef.value?.editor);
      },
    },
  ],
  [
    'code',
    {
      icon: 'i-ri-code-s-slash-fill',
      status: false,
      onClick: () => {
        useCode(tiptapRef.value?.editor);
      },
    },
  ],
  [
    'codeBlock',
    {
      icon: 'i-ri-code-box-fill',
      status: false,
      onClick: () => {
        useCodeBlock(tiptapRef.value?.editor);
      },
    },
  ],
  [
    'blockquote',
    {
      icon: 'i-ri-chat-quote-fill',
      onClick: () => {
        useBlockQuote(tiptapRef.value?.editor);
      },
    },
  ],
  [
    'image',
    {
      icon: 'i-ri-image-fill',
      onClick: () => {
        useUpload('image');
      },
    },
  ],
  [
    'undo',
    {
      icon: 'i-ri-arrow-go-back-fill',
      onClick: () => {
        useHistory(tiptapRef.value?.editor, 'undo');
      },
    },
  ],
  [
    'redo',
    {
      icon: 'i-ri-arrow-go-forward-fill',
      onClick: () => {
        useHistory(tiptapRef.value?.editor, 'redo');
      },
    },
  ],
]);
const canOutput = computed(() => {
  return !!tiptapRef.value?.editor?.storage.characterCount.characters();
});
const focus = () => {
  return useEditorFocus(tiptapRef.value?.editor);
};
const { copy } = useClipboard();
</script>
<style scoped></style>
