<script setup lang="ts">
import { Image } from "~/types/image";

const { data } = defineProps({
  data: {
    type: Array<Image>,
    required: true,
  },
});
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  >
    <ImageCard v-for="image in data" :key="image.id" :data="image" />
  </div>
</template>
