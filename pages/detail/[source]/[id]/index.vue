<script setup>
const router = useRoute();
const { id, source } = router.params;
const { data, pending, error } = useFetch(`/api/${source}/detail?id=${id}`);
</script>
<template>
  <div class="bg-slate-300 animate-pulse h-60" v-if="pending"></div>
  <div v-else-if="error" class="text-center">
    <h1 class="text-2xl font-bold">Error</h1>
    <p>{{ error }}</p>
  </div>
  <div v-else>
    <div class="flex flex-col items-center">
      <div class="w-full max-h-[100vh] overflow-auto">
        <LoadImage class="w-full" :src="data.url" alt="image">
          <template #progress="{ progress }">
            <div>
              <!-- 进度条 -->
              <div class="bg-slate-300 h-1 rounded-full overflow-hidden">
                <div
                  class="bg-slate-400 h-full"
                  :style="{ width: `${progress * 100}%` }"
                ></div>
              </div>
            </div>
          </template>
          <template #error="{ error }">
            <div>
              {{ error }}
            </div>
          </template>
          <template #img="{ src, alt }">
            <img :src="src" :alt="alt" />
          </template>
        </LoadImage>
      </div>
      <div class="w-full mt-5">
        <div class="bg-white rounded-2xl shadow-xl p-5">
          <h1 class="text-2xl font-bold">Tags</h1>
          <div class="flex flex-wrap mt-3">
            <div
              v-for="tag in data.tags"
              :key="tag"
              class="bg-slate-300 rounded-full px-3 py-1 text-sm mr-2 mb-2"
            >
              {{ tag }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
