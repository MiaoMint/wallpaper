<script setup>
import GridList from "~/components/Layout/GridList.vue";

const list = ref([]);
const page = ref(1);
const kw = ref("");

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

const { data, pending } = useAsyncData(
  "list",
  async () => {
    const data = await fetchJson(
      `/api/wallhaven/search?kw=${kw.value}&page=${page.value}`,
    );
    return data;
  },
  {
    server: false,
    watch: [page, kw],
  },
);

const onSearch = (e) => {
  e.preventDefault();
  list.value = [];
  page.value = 1;
  kw.value = e.target[0].value;
};

const onFilteredImages = (tag) => {
  list.value = [];
  page.value = 1;
  kw.value = tag;
};

const handelLoad = () => {
  if (pending.value) {
    return;
  }
  page.value++;
};

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

const handelFocus = () => {
  // 聚焦搜索框
  const input = document.querySelector("input");
  input && input.focus(
    {
      immediate: true,
    }
  );
};

onActivated(() => {
  handelFocus();
});
</script>
<template>
  <div class="mt-10">
    <div class="mb-8 text-2xl">Search</div>
    <div class="mb-8">
      <form @submit="onSearch">
        <input
          type="text"
          class="border shadow-sm border-gray-300 rounded-md px-3 py-1 w-full md:w-96"
          placeholder="Search..."
        />
      </form>
    </div>
    <div class="mb-8">
      <div class="flex flex-wrap">
        <Tag
          v-for="tag in tags"
          :key="tag"
          :selected="kw === tag"
          @click="onFilteredImages(tag)"
          :tag="tag"
        />
      </div>
    </div>
    <InfiniteLoad @load="handelLoad">
      <div class="mb-8">
        <GridList v-if="list.length" :data="list" />
        <div v-else class="text-center mt-20 flex flex-col justify-center">
          <div class="text-2xl">No More data</div>
        </div>
      </div>
    </InfiniteLoad>
  </div>
</template>
