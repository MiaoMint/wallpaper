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
  console.log(props.data);
  return props.data.filter((item: Image) => {
    if (item.purity === "nsfw" && !props.showNSFW) return false;
    return true;
  });
});
</script>

<template>
  <ImageCard
    :class="props.itemClass"
    v-for="image in list"
    :key="image.id"
    :data="image"
  />
</template>
