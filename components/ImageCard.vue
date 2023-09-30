<script setup lang="ts">
import { Image } from "~/types/image";
import { FastAverageColor } from "fast-average-color";

const { data } = defineProps({
  data: {
    type: Object as PropType<Image>,
    required: true,
  },
});

const dominantColor = ref("");
const img = ref<HTMLImageElement>();

// onMounted(() => {
//   if (!img.value) {
//     return;
//   }
//   const fac = new FastAverageColor();
//   fac
//     .getColorAsync(img.value)
//     .then((color) => {
//       dominantColor.value = color.hex;
//     })
//     .catch((e) => {
//       console.error(e);
//     });
// });
</script>
<template>
  <AnimationElement :deg="10">
    <div class="relative transition-all cursor-pointer">
      <div
        class="bg absolute left-5 right-5 h-full w-full -bottom-7 -z-10"
        :style="{
          background: `linear-gradient(247.23deg, ${dominantColor} 0%, ${dominantColor} 30%)`,
        }"
      ></div>
      <NuxtLink :to="`/detail/${data.source}/${data.id}`">
        <div
          class="relative hover:-translate-y-3 shadow-xl transition-all rounded-2xl overflow-hidden"
        >
          <LoadImage
            ref="img"
            class="w-full h-ful z-20"
            :src="data.sample"
            :alt="data.resolution"
          >
            <template #error>
              <div
                class="h-full min-h-[10rem] flex justify-center items-center"
              >
                <div class="text-2xl">😭</div>
              </div>
            </template>
            <template #progress="{ progress }">
              <div class="w-full min-h-[10rem]">
                <div class="h-full flex justify-center items-center">
                  <div class="text-2xl">{{ Math.round(progress * 100) }}%</div>
                </div>
              </div>
            </template>
            <template #img="{ src, alt }">
              <img :src="src" :alt="alt" class="w-full h-full object-cover" />
            </template>
          </LoadImage>
          <div
            class="absolute bottom-0 left-3 right-3 h-16 flex items-center justify-between text-sm z-30"
          >
            <div class="bg-white bg-opacity-50 px-4 py-1 rounded-full">
              <div class="text-sm">🖼 {{ data.resolution }}</div>
            </div>
            <div class="bg-white bg-opacity-50 px-4 py-1 rounded-full">
              <div class="text-sm">🌸 {{ data.source }}</div>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </AnimationElement>
</template>

<style scoped>
.bg {
  mask-image: radial-gradient(rgba(0, 0, 0, 0.7), transparent 60%);
  /* 3d转换 */
  transform: rotateX(60deg) translateZ(-20px);
}
</style>
