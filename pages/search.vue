<script setup lang="ts">
import GridList from "~/components/Layout/GridList.vue";
import { Image, Source } from "~/types/image";

const list = ref<Image[]>([]);
const page = ref(1);
const kw = ref((useRoute().query.kw as string) || "");
const isSearched = ref<boolean>(kw.value !== "" ?? false);
const input = ref<HTMLInputElement>();
const selectSource = ref<Source>(
  (useRoute().query.source as Source) ?? Source.Wallhaven,
);

// 获取 tags
const { data: tags } = useAsyncData(
  "tags",
  async () => {
    const data = await fetchJson("/api/wallhaven/latest");
    const index = Math.floor(Math.random() * data.length);
    const sample = data[index];
    const origin = await fetchJson(`/api/wallhaven/detail?id=${sample.id}`);
    return origin.tags;
  },
  {
    server: false,
  },
);

const { data, pending, error, refresh } = useAsyncData(
  `list-${kw.value}`,
  async () => {
    const data = await fetchJson(
      `/api/${selectSource.value}/search?kw=${kw.value}&page=${page.value}`,
    );
    return data;
  },
  {
    server: false,
    watch: [page],
  },
);

const onSubmit = (e: Event) => {
  e.preventDefault();
  handelSearch();
};

const handelSearch = (tags?: string) => {
  isSearched.value = true;
  list.value = [];
  page.value = 1;
  tags && (kw.value = tags);
  const source = useRoute().query.source;
  if (source) {
    selectSource.value = source as Source;
  } else {
    selectSource.value = Source.Wallhaven;
  }
  refresh();
};

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

watch(kw, (value) => {
  useRouter().replace({
    query: {
      kw: value,
      source: selectSource.value,
    },
  });
});

watch(selectSource, (value) => {
  list.value = [];
  page.value = 1;
  useRouter().replace({
    query: {
      source: value,
      kw: kw.value,
    },
  });
  refresh();
});

onActivated(() => {
  const str = useRoute().query.kw as string;
  if (str != kw.value && str) {
    handelSearch(str);
  }
  input.value?.focus();
});

onDeactivated(() => {
  input.value?.blur();
});
</script>
<template>
  <div class="mt-10">
    <div class="mb-8 text-2xl">Search</div>
    <div class="mb-8">
      <form @submit="onSubmit">
        <input
          type="text"
          class="border shadow-sm border-gray-300 rounded-md px-3 py-1 w-full md:w-96"
          placeholder="Search..."
          autofocus
          v-model="kw"
          ref="input"
        />
      </form>
    </div>
    <div class="mb-3">
      <SourceSwitch v-model:select-source="selectSource" />
    </div>
    <div class="mb-8">
      <div class="flex flex-wrap">
        <Tag
          v-for="tag in tags"
          :key="tag"
          :selected="kw === tag"
          @click="handelSearch(tag)"
          :tag="tag"
        />
      </div>
    </div>
    <InfiniteLoad v-if="isSearched" @load="handelLoad">
      <div class="mb-8">
        <GridList v-if="list.length" :data="list" />
        <div v-if="pending">Loading...</div>
        <div v-if="error">{{ error }}</div>
      </div>
    </InfiniteLoad>
  </div>
</template>
