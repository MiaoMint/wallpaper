<script setup lang="ts">
import { Image } from "@/types/image";

const props = defineProps({
  data: {
    type: Array<Image>,
    required: true,
  },
  showNSFW: {
    type: Boolean,
    default: false,
  },
  itemClass: {
    type: String,
    default: "",
  },
});

const list = computed(() => {
  return props.data.filter((item: Image) => {
    if (item.purity === "nsfw" && !props.showNSFW) return false;
    return true;
  });
});
</script>

<template>
  <div v-for="image in list" :key="image.id">
    <ImageCard :class="props.itemClass" :data="image" />
    <input type="text" :value="JSON.stringify(image)" hidden />
  </div>
</template>
