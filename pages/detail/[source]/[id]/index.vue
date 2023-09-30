<script setup>
const router = useRoute();
const { id, source } = router.params;
const { data, pending, error } = useFetch(`/api/${source}/detail?id=${id}`);

// 当前位置
let currentPosition = 0;

const onWindowScrool = () => {
  const sheet = document.getElementById("sheet");
  if (!sheet) return;
  const isScrollDown = window.scrollY > currentPosition;
  currentPosition = window.scrollY;
  if (isScrollDown) {
    sheet.style.bottom = "-100%";
  } else {
    sheet.style.bottom = "0";
  }
};

const onDrag = (e) => {
  console.log(e);
  const sheet = document.getElementById("sheet");
  if (!sheet) return;
  // 鼠标的位置距离底部的位置
  const { clientY } = e;
  if (clientY <= 0) {
    sheet.style.transition = "all 0.3s";
    return;
  }
  sheet.style.transition = "none";
  const distance = window.innerHeight - clientY + 25;
  if (distance > 300) return;
  sheet.style.height = `${distance}px`;
};

onActivated(() => {
  window.addEventListener("scroll", onWindowScrool);
});

onDeactivated(() => {
  window.removeEventListener("scroll", onWindowScrool);
});
</script>
<template>
  <div class="bg-slate-300 animate-pulse h-screen" v-if="pending"></div>
  <div v-else-if="error" class="text-center">
    <h1 class="text-2xl font-bold">Error</h1>
    <p>{{ error }}</p>
  </div>
  <div v-else>
    <div class="flex flex-col items-center">
      <div class="w-full h-screen">
        <LoadImage class="h-full w-full" :src="data.url" alt="image">
          <template #progress="{ progress }">
            <div
              class="h-3/4 flex flex-col justify-center items-center text-3xl"
            >
              <div>😝</div>
              <div>{{ Math.floor(progress * 100) }}%</div>
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
      <div
        class="w-full fixed left-1/2 -translate-x-1/2 right-0 bottom-0 max-w-[1200px] transition-all h-28"
        id="sheet"
      >
        <div class="bg-white rounded-t-xl shadow-lg border p-5 h-full">
          <div
            class="w-32 m-auto h-1 rounded-full bg-gray-400 overflow-hidden cursor-n-resize"
            @drag="onDrag"
            draggable="true"
          ></div>
          <div class="h-full overflow-auto">
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
            <div class="mt-3">
              <h1 class="text-2xl font-bold">Source</h1>
              {{ data.source }}
            </div>
            <div class="mt-3">
              <h1 class="text-2xl font-bold">Resolution</h1>
              {{ data.resolution }}
            </div>
            <div class="mt-3">
              <h1 class="text-2xl font-bold">FileSize</h1>
              {{ data.fileSize }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
