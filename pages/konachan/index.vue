<template>
  <div id="app-scroller">
    <Hero class="mb-8" />
    <div class="mb-8 text-2xl">Konachan</div>
    <div class="mb-8">
      <InfiniteLoad @load="handelLoad">
        <Waterfall v-if="list.length" :data="list!" />
        <div v-if="pending">Loading...</div>
        <div v-if="error">Error</div>
      </InfiniteLoad>
    </div>
  </div>
</template>

<script setup lang="ts">
import Waterfall from "~/components/Layout/Waterfall.vue";
import { Image } from "~/types/image";

const page = ref(1);
const list = ref<Image[]>([]);
const { data, pending, error } = useFetch("/api/konachan/latest", {
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
