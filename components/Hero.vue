<script setup lang="ts">
import { fetchJson } from "~/utils/fetch";

const { data, error, pending } = useAsyncData(
  "hero",
  async () => {
    const data = await fetchJson("/api/wallhaven/latest");
    const index = Math.floor(Math.random() * data.length);
    const sample = data[index];
    const origin = await fetchJson(`/api/wallhaven/detail?id=${sample.id}`);
    return origin;
  },
  {
    server: false,
  },
);
</script>

<template>
  <div
    v-if="pending || error"
    class="h-[15em] lg:h-[30em] animate-pulse bg-slate-300 rounded-2xl flex justify-center items-center"
  >
    <div v-if="error">
      {{ error }}
    </div>
  </div>
  <AnimationElement :deg="2" v-else>
    <NuxtLink :to="`/detail/${data?.source}/${data?.id}`">
      <div class="relative h-[15em] lg:h-[30em]">
        <div class="absolute left-0 right-0 top-0 bottom-0">
          <LoadImage
            class="h-full w-full object-top object-cover rounded-2xl shadow-xl overflow-hidden"
            :src="data?.url"
            alt="hero"
            referrerpolicy="no-referrer"
          />
        </div>
        <div
          class="absolute bottom-0 left-5 right-5 h-16 flex items-center justify-between"
        >
          <div class="bg-white bg-opacity-50 px-4 py-1 rounded-full">
            <div class="text-sm">🖼 {{ data?.resolution }}</div>
          </div>
          <div class="bg-white bg-opacity-50 px-4 py-1 rounded-full">
            <div class="text-sm">🌸 {{ data?.source }}</div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </AnimationElement>
</template>
