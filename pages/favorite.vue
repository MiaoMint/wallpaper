<script setup lang="ts">
import GridList from "~/components/Layout/GridList.vue";
import { ImageDetail } from "~/types/image";
import { BlobWriter } from "@zip.js/zip.js";

const list = ref<ImageDetail[]>([]);
const tags = ref<string[]>([]);
const currentTag = ref<string | null>(null);
const showDownloadDialog = ref(false);

// 过滤出当前选中的标签的图片
const onFilteredImages = (tag: string) => {
  if (currentTag.value === tag) {
    currentTag.value = null;
  } else {
    currentTag.value = tag;
  }

  if (currentTag.value) {
    list.value = [
      ...getImages().filter((image) => image.tags.includes(currentTag.value!)),
    ];
  } else {
    list.value = [...getImages()];
  }
};

onActivated(() => {
  const images = getImages();
  list.value = [...images];
  tags.value = [...new Set(images.flatMap((image) => image.tags))];
});
</script>
<template>
  <div>
    <div class="mb-8 flex justify-between items-center">
      <div class="text-2xl">Favorites</div>
      <button
        class="p-2 border rounded-lg mb-2 shadow"
        @click="showDownloadDialog = true"
      >
        💾
      </button>
    </div>
    <div class="mb-8">
      <div class="flex flex-wrap max-h-[200px] overflow-auto">
        <Tag
          v-for="tag in tags"
          :key="tag"
          :selected="currentTag === tag"
          @click="onFilteredImages(tag)"
          :tag="tag"
        />
      </div>
    </div>
    <div class="mb-8">
      <GridList v-if="list.length" :data="list!" />
      <div v-else class="text-center mt-20 flex flex-col justify-center">
        <div class="text-2xl">No favorites yet</div>
        <div class="text-xl">Add some!</div>
      </div>
    </div>
    <DownloadDialog
      v-if="showDownloadDialog"
      @close="showDownloadDialog = false"
    />
  </div>
</template>
