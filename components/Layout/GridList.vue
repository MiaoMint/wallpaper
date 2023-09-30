<script setup lang="ts">
import { Image } from "~/types/image";
import Layout from "./Layout.vue";

const { data, showNSFW } = defineProps({
  data: {
    type: Array<Image>,
    required: true,
  },
  showNSFW: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="grid grid-flow-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  >
    <Layout :data="data" :showNSFW="showNSFW" />
  </div>
</template>
