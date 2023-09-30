<script setup lang="ts">
import { Image } from "~/types/image";
import Layout from "./Layout.vue";
import { VueFlexWaterfall } from "vue-flex-waterfall";

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
  <VueFlexWaterfall
    align-content="center"
    col="4"
    col-spacing="30"
    :break-at="{ 1000: 3, 800: 2, 500: 1 }"
  >
    <Layout itemClass="my-3" :data="data" :showNSFW="showNSFW" />
  </VueFlexWaterfall>
</template>
