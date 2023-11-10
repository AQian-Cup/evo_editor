<template>
  <div class="cursor-pointer text-5 text-zinc-8" :class="[props.icon]"></div>
</template>
<script lang="ts" setup>
interface Props {
  icon: string;
}
const props = defineProps<Props>();
</script>
<style scoped></style>
