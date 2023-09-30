<template>
  <div id="app-scroller">
    <Hero class="mb-8" />
    <div class="mb-8 text-2xl">Wallhaven</div>
    <div class="mb-8">
      <InfiniteLoad @load="handelLoad">
        <GridList v-if="list.length" :data="list!" />
        <div v-if="pending">Loading...</div>
        <div v-if="error">Error</div>
      </InfiniteLoad>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image } from "~/types/image";

definePageMeta({
  title: "Wallhaven",
  description: "Wallhaven",
  scrollToTop: false,
});

const page = ref(1);
const list = ref<Image[]>([]);
const { data, pending, error } = useFetch("/api/wallhaven/latest", {
  server: false,
  params: {
    page,
  },
});

watch(
  data,
  (value) => {
    if (!value) {
      return;
    }
    list.value = [...list.value, ...value];
  },
  {
    immediate: true,
  },
);

const handelLoad = () => {
  if (pending.value) {
    return;
  }
  page.value++;
};
</script>
