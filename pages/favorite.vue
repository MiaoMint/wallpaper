<script setup lang="ts">
import GridList from "~/components/Layout/GridList.vue";
import { ImageDetail } from "~/types/image";
import Selecto from "selecto";

const list = ref<ImageDetail[]>([]);
const tags = ref<string[]>([]);
const currentTag = ref<string | null>(null);
const showDownloadDialog = ref(false);
const target = ref<HTMLDivElement>();
let selecto: Selecto | undefined;
const selected = ref<ImageDetail[]>([]);

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

const newSelecto = () => {
  selecto = new Selecto({
    container: target.value,
    selectableTargets: [".target > div"],
    hitRate: 1,
    selectByClick: false,
    dragContainer: target.value,
  });

  console.log(selecto);

  selecto.on("select", (e) => {
    e.added.forEach((el) => {
      el.classList.add("selected");
      const input = el.querySelector("input");
      if (input) {
        selected.value.push(JSON.parse(input.value));
      }
    });
    e.removed.forEach((el) => {
      if (showDownloadDialog.value) {
        return;
      }
      el.classList.remove("selected");
      const input = el.querySelector("input");
      if (input) {
        selected.value = selected.value.filter(
          (item) => item.id !== JSON.parse(input.value).id,
        );
      }
    });
  });
};

onActivated(() => {
  const images = getImages();
  list.value = [...images];
  tags.value = [...new Set(images.flatMap((image) => image.tags))];
  newSelecto();
});

onDeactivated(() => {
  selecto?.destroy();
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
    <div>
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
    <div class="mb-8 pt-8" ref="target">
      <GridList class="target" v-if="list.length" :data="list!" />
      <div v-else class="text-center mt-20 flex flex-col justify-center">
        <div class="text-2xl">No favorites yet</div>
        <div class="text-xl">Add some!</div>
      </div>
    </div>
    <DownloadDialog
      :images="selected.length ? selected : list"
      v-if="showDownloadDialog"
      @close="showDownloadDialog = false"
    />
  </div>
</template>

<style>
.selected {
  filter: brightness(0.5);
}
</style>
