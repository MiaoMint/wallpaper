<script setup>
const { tolerance } = defineProps({
  tolerance: {
    type: Number,
    default: 20,
  },
});

const emit = defineEmits(["load"]);

const onScroll = () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - tolerance) {
    emit("load");
  }
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <div>
    <slot />
  </div>
</template>
