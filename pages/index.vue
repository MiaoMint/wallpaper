<script setup lang="ts">
import GridList from "~/components/Layout/GridList.vue";
import { Image, Source } from "~/types/image";
console.log("https://github.com/MiaoMint/wallpaper");

const page = ref(1);
const list = ref<Image[]>([]);

const selectSource = ref<Source>(
  (useRoute().query.source as Source) ?? Source.Wallhaven,
);

const { data, pending, error, refresh } = useAsyncData(
  `latest-${selectSource.value}`,
  async () => {
    const url = `/api/${selectSource.value}/latest?page=${page.value}`;
    const data = await fetchJson(url);
    return data;
  },
  {
    watch: [page],
    server: false,
  },
);

const handelLoad = () => {
  if (pending.value) {
    return;
  }
  page.value++;
};

watch(data, (value) => {
  if (!value) {
    return;
  }
  list.value = [...list.value, ...value];
});

watch(selectSource, (value) => {
  list.value = [];
  page.value = 1;
  useRouter().replace({
    query: {
      source: value,
    },
  });
  refresh();
});
</script>

<template>
  <div id="app-scroller">
    <Hero class="mb-8" />
    <div class="mb-8">
      <SourceSwitch v-model:select-source="selectSource" />
    </div>
    <div class="mb-8">
      <InfiniteLoad @load="handelLoad">
        <GridList v-if="list.length" :data="list!" />
        <div v-if="pending">Loading...</div>
        <button v-else @click="page++">Load more</button>
        <div v-if="error">{{ error }}</div>
      </InfiniteLoad>
    </div>
  </div>
</template>
