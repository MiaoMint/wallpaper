<script setup lang="ts">
import { Image } from "~/types/image";

const { data } = defineProps({
  data: {
    type: Object as PropType<Image>,
    required: true,
  },
});

const image = ref<HTMLDivElement>();
const visible = ref(false);

// 滚动到可视区域时加载图片
let observer: IntersectionObserver;

watch(visible, (value) => {
  console.log(value, data);
  observer.disconnect();
});

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visible.value = true;
        observer.unobserve(entry.target);
      }
    });
  });
  observer.observe(image.value!);
});
</script>
<template>
  <AnimationElement :deg="10">
    <div ref="image" class="relative transition-all cursor-pointer">
      <NuxtLink :to="`/detail/${data.source}/${data.id}`">
        <div
          class="relative hover:-translate-y-3 shadow-xl transition-all rounded-2xl border overflow-hidden"
        >
          <LoadImage
            v-if="visible"
            ref="img"
            class="w-full h-ful z-20"
            :src="data.sample"
            :alt="data.resolution"
          >
            <template #error>
              <div
                class="h-full min-h-[180px] flex justify-center items-center"
              >
                <div class="text-2xl">😭</div>
              </div>
            </template>
            <template #progress="{ progress }">
              <div
                class="h-full min-h-[180px] flex justify-center items-center"
              >
                <div class="text-lg">{{ Math.round(progress * 100) }}%</div>
              </div>
            </template>
            <template #img="{ src, alt }">
              <img
                :src="src"
                :alt="alt"
                class="w-full h-full md:h-[15vw] min-h-[100px] md:max-h-[180px] object-cover"
              />
            </template>
          </LoadImage>
          <div
            v-else
            class="w-full h-full md:h-[15vw] min-h-[100px] md:max-h-[180px]"
          ></div>
          <div
            class="absolute bottom-0 left-2 right-2 h-10 flex items-center justify-between text-xs z-30"
          >
            <div
              class="bg-white bg-opacity-50 px-4 py-1 rounded-full flex-shrink-0"
            >
              <div>🖼 {{ data.resolution }}</div>
            </div>
            <div
              class="bg-white bg-opacity-50 px-4 py-1 rounded-full flex-shrink-0"
            >
              <div>🌸 {{ data.source }}</div>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </AnimationElement>
</template>
