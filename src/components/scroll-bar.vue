<template>
  <div ref="scrollBarRef" relative h-full w-full overflow-hidden>
    <div ref="viewRef" h-full overflow-auto>
      <div ref="wrapRef">
        <slot></slot>
      </div>
    </div>
    <div
      v-show="scrollBarHeight < wrapHeight"
      ref="barRef"
      :style="`transform: translateY(${barMove}px); height: ${barHeight}px`"
      absolute
      right-0
      top-0
      mx-0.5
      my-1
      w-1.5
      transform-gpu
      cursor-pointer
      rounded-full
      bg-zinc-4
      transition-height
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useElementSize, useScroll, useDraggable } from '@vueuse/core';
import { useElementBounding } from '@vueuse/core/index.cjs';

const scrollBarRef = ref<HTMLDivElement | null>(null);
const viewRef = ref<HTMLDivElement | null>(null);
const wrapRef = ref<HTMLDivElement | null>(null);
const barRef = ref<HTMLDivElement | null>(null);
const { y } = useElementBounding(viewRef);
const { y: scrollY } = useScroll(viewRef);
const { height: scrollBarHeight } = useElementSize(scrollBarRef);
const { height: wrapHeight } = useElementSize(wrapRef);
const { y: barY } = useDraggable(barRef, {
  axis: 'y',
  onMove: () => {
    scrollY.value =
      ((barY.value - y.value) / scrollBarHeight.value) * wrapHeight.value;
  },
});
const barHeight = computed(() => {
  return Math.pow(scrollBarHeight.value, 2) / wrapHeight.value;
});
const barMove = computed(() => {
  return (scrollY.value / wrapHeight.value) * scrollBarHeight.value;
});
</script>
<style scoped></style>
