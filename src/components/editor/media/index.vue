<template>
  <div
    left="1/2"
    translate-x="-1/2"
    flex="~ col"
    fixed
    top-24
    z-1
    h-40
    w-100
    items-center
    justify-center
    border-4
    border-zinc-8
    rounded-4
    bg-white
    px-4
    space-y-4
    :class="props.modelValue ? [''] : ['hidden!']"
  >
    <span self-start font-bold>{{ explanation }}</span>
    <input v-model="url" w-full border-2 border-zinc-8 rounded-full px-2 />
    <div w="1/2" flex items-center justify-between font-bold text-white>
      <button
        rounded-full
        bg-zinc-8
        px-4
        py-1
        @click="emit('update:modelValue', false)"
      >
        取消
      </button>
      <button
        rounded-full
        bg-zinc-8
        px-4
        py-1
        @click="
          emit('update:modelValue', false);
          emit('submit', url);
        "
      >
        上传
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    type?: string;
  }>(),
  {
    type: 'image',
  },
);
const url = ref('');
const emit = defineEmits<{
  submit: [url: string];
  'update:modelValue': [modelValue: boolean];
}>();
const explanation = computed(() => {
  return props.type === 'image' ? '上传图片' : '上传视频';
});
</script>
<style scoped></style>
