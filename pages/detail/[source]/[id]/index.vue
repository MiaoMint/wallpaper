<script setup>
import { FastAverageColor } from "fast-average-color";

const router = useRoute();
const { id, source } = router.params;
const { data, pending, error } = useFetch(`/api/${source}/detail?id=${id}`);

// 当前位置
let currentPosition = 0;

const backgroundColor = ref("");
const isTouchMove = ref(false);
const isFavorited = ref(false);

const onWindowScrool = () => {
  if (isTouchMove.value) return;
  // 如果是手机端，不需要滚动隐藏
  if (window.innerWidth < 768) return;
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

const closeSheet = () => {
  const sheet = document.getElementById("sheet");
  if (!sheet) return;
  sheet.style.bottom = "-100%";
};

const onDrag = (e) => {
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

const onTouchmove = (e) => {
  // isTouchMove.value = true;
  // const sheet = document.getElementById("sheet");
  // if (!sheet) return;
  // const { clientY } = e.touches[0];
  // if (clientY <= 0) {
  //   sheet.style.transition = "all 0.3s";
  //   return;
  // }
  // sheet.style.transition = "none";
  // const distance = window.innerHeight - clientY + 25;
  // if (distance > 400) return;
  // sheet.style.height = `${distance}px`;
};

const genBackground = () => {
  const img = document.getElementById("image");
  if (!img) {
    return;
  }
  const fac = new FastAverageColor();
  fac
    .getColorAsync(img)
    .then((color) => {
      backgroundColor.value = `
      linear-gradient(215deg, ${color.hex}, transparent 40%),
    radial-gradient(${color.hex}, transparent 40%) no-repeat -60vw -40vh /
      105vw 200vh,
    radial-gradient(${color.hex}, transparent 65%) no-repeat 50%
      calc(100% + 20rem) / 60rem 30rem
      `;
      document.body.style.background = backgroundColor.value;
    })
    .catch((e) => {
      console.error(e);
    });
};

const download = () => {
  // 获取 image 的 url
  const img = document.getElementById("image");
  if (!img) {
    return;
  }
  // 下载图片
  const a = document.createElement("a");
  a.href = img.src;
  a.download = data.value.url.split("/")?.pop();
  a.click();
};

onMounted(() => {
  isFavorited.value = isFavorite(id, source);

  watch(isFavorited, (value) => {
    if (!data.value) {
      return;
    }
    console.log("isFavorited", value);
    if (value) {
      addFavorite(data.value);
    } else {
      removeFavorite(data.value);
    }
  });
});

onActivated(() => {
  window.addEventListener("scroll", onWindowScrool);
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.background = backgroundColor.value;
});

onDeactivated(() => {
  window.removeEventListener("scroll", onWindowScrool);
  // 重置背景颜色
  document.body.style.background = "#fff";
});
</script>
<template>
  <div class="h-screen" v-if="pending">
    <div class="h-3/4 flex flex-col justify-center items-center text-3xl">
      <div>🤔</div>
      <div>Loading...</div>
    </div>
  </div>
  <div v-else-if="error" class="text-center">
    <h1 class="text-2xl font-bold">Error</h1>
    <p>{{ error }}</p>
  </div>
  <div v-else>
    <div class="flex flex-col items-center">
      <div class="w-full md:min-h-screen">
        <LoadImage
          class="h-full w-full flex justify-center"
          :src="data.url"
          alt="image"
        >
          <template #progress="{ progress }">
            <div class="md:h-screen">
              <div
                class="h-3/4 flex flex-col justify-center items-center text-3xl"
              >
                <div>🤤</div>
                <div>{{ Math.floor(progress * 100) }}%</div>
              </div>
            </div>
          </template>
          <template #error="{ error }">
            <div>
              {{ error }}
            </div>
          </template>
          <template #img="{ src, alt }">
            <a :href="data.url" target="_blank" rel="noopener noreferrer">
              <img
                class="shadow-md rounded-lg mb-8"
                :src="src"
                :alt="alt"
                @load="genBackground"
                id="image"
              />
            </a>
          </template>
        </LoadImage>
      </div>
      <div
        class="w-full md:fixed md:left-1/2 md:-translate-x-1/2 md:right-0 md:bottom-0 max-w-[1200px] transition-all md:h-28"
        id="sheet"
      >
        <div
          class="bg-white rounded-xl md:rounded-t-xl md:rounded-b-none shadow-lg border h-full"
        >
          <div
            class="h-10 flex justify-center cursor-n-resize relative px-5"
            @drag.prevet="onDrag"
            @touchmove="onTouchmove"
            @touchend="isTouchMove = false"
            draggable="true"
          >
            <div
              class="w-32 hidden md:block m-auto h-1 rounded-full bg-gray-400 overflow-hidden"
            ></div>
            <!-- 暂时收起按钮 -->
            <div
              class="hidden absolute top-0 right-2 h-full md:flex items-center"
            >
              <button
                class="text-gray-400 hover:text-gray-600"
                @click="closeSheet"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div class="h-full overflow-auto px-5 pb-10">
            <!-- 收藏 & 下载 -->
            <button
              class="p-2 border rounded-lg mb-2 shadow-md mr-3"
              @click="isFavorited = !isFavorited"
            >
              <span v-if="isFavorited"> ❤ </span>
              <span v-else> 🖤 </span>
            </button>
            <button
              class="p-2 border rounded-lg mb-2 shadow-md mr-3"
              @click="download"
            >
              💾
            </button>
            <h1 class="text-2xl font-bold">Tags</h1>
            <div class="flex flex-wrap mt-3">
              <NuxtLink
                :to="{
                  name: 'search',
                  query: {
                    source: data.source,
                    kw: tag,
                  },
                }"
                v-for="tag in data.tags"
                :key="tag"
                class="bg-slate-300 rounded-full px-3 py-1 text-sm mr-2 mb-2"
              >
                {{ tag }}
              </NuxtLink>
            </div>

            <div class="mt-3">
              <h1 class="text-2xl font-bold">Source</h1>
              {{ data.source }}
              <a
                v-if="data.imageSource"
                :href="data.imageSource"
                target="_blank"
                >{{ data.imageSource }}</a
              >
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
