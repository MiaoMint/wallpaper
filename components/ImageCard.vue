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
const isHover = ref(false);

// 滚动到可视区域时加载图片
let observer: IntersectionObserver;

let timer: NodeJS.Timeout;

const handelMouseEnter = (e: MouseEvent) => {
  if (timer) {
    return;
  }
  timer = setTimeout(() => {
    isHover.value = true;
  }, 500);
};

const handelMouseLeave = () => {
  clearTimeout(timer);
  timer = null!;
  isHover.value = false;
};

watch(visible, (value) => {
  observer.disconnect();
});

onMounted(() => {
  if (image.value) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.value = true;
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(image.value!);
    image.value!.addEventListener("mouseenter", handelMouseEnter);
    image.value!.addEventListener("mouseleave", handelMouseLeave);
  }
});

onUnmounted(() => {
  if (image.value) {
    image.value!.removeEventListener("mouseenter", handelMouseEnter);
    image.value!.removeEventListener("mouseleave", handelMouseLeave);
  }
});
</script>
<template>
  <AnimationElement
    :class="{
      'z-50': isHover,
    }"
    :deg="10"
  >
    <div ref="image" class="relative transition-all cursor-pointer">
      <NuxtLink :to="`/detail/${data.source}/${data.id}`">
        <div
          :class="[
            'relative hover:-translate-y-3 shadow-xl transition-all rounded-2xl border w-full h-full md:h-[15vw] md:max-h-[180px]',
            {
              'overflow-hidden': !isHover,
            },
          ]"
        >
          <LoadImage
            v-if="visible"
            ref="img"
            class="w-full h-full flex justify-center items-center min-h-[140px]"
            :src="data.sample"
            :alt="data.resolution"
          >
            <template #error>
              <div class="text-2xl">😭</div>
            </template>
            <template #img="{ src, alt }">
              <img
                :src="src"
                :alt="alt"
                :class="[
                  'w-full object-cover rounded-2xl',
                  {
                    'h-full': !isHover,
                    'h-auto z-40 shadow-xl': isHover,
                  },
                ]"
              />
            </template>
          </LoadImage>
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
