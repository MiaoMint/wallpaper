<script setup lang="ts">
import { Image } from "~/types/image";

const { data } = defineProps({
  data: {
    type: Object as PropType<Image>,
    required: true,
  },
});
</script>
<template>
  <AnimationElement :deg="10">
    <div class="relative transition-all cursor-pointer">
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
              <img :src="src" :alt="alt" class="w-full h-full object-cover" />
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
