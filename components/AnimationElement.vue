<script setup lang="ts">
const { deg } = defineProps({
  deg: {
    type: Number,
    required: true,
    default: 5,
  },
});

const div = ref<HTMLDivElement>();

const onMouseMove = (e: MouseEvent) => {
  div.value!.className = "transition-all duration-75";
  const { clientX, clientY } = e;
  const { left, top, width, height } = div.value!.getBoundingClientRect();
  const x = clientX - left;
  const y = clientY - top;
  const centerX = width / 2;
  const centerY = height / 2;
  const deltaX = x - centerX;
  const deltaY = y - centerY;
  const percentX = deltaX / centerX;
  const percentY = deltaY / centerY;
  const offsetX = deg * percentX;
  const offsetY = deg * percentY;
  div.value!.style.transform = `perspective(1000px) rotateX(${-offsetY}deg) rotateY(${offsetX}deg)`;
};

const onMouseLeave = () => {
  div.value!.className = "transition-all duration-500 ease-in-out";
  div.value!.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
};

onMounted(() => {
  if (div.value) {
    div.value.addEventListener("mousemove", onMouseMove);
    div.value.addEventListener("mouseleave", onMouseLeave);
  }
});

onUnmounted(() => {
  if (div.value) {
    div.value.removeEventListener("mousemove", onMouseMove);
    div.value.removeEventListener("mouseleave", onMouseLeave);
  }
});
</script>
<template>
  <div>
    <div ref="div">
      <slot />
    </div>
  </div>
</template>
