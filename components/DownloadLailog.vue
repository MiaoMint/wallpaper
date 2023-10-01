<script setup lang="ts">
import { BlobReader, BlobWriter, ZipWriter } from "@zip.js/zip.js";

const emit = defineEmits(["close"]);
const isDownloading = ref(false);
const images = getImages();
const progress = ref(0);
const faileds = ref<string[]>([]);

const handelDownload = async () => {
  progress.value = 0;
  isDownloading.value = true;
  faileds.value = [];
  const zipFileWriter = new BlobWriter();
  const zipWriter = new ZipWriter(zipFileWriter);

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const fileName = image.url.split("/").pop()!;
    try {
      const response = await fetch("/api/image?url=" + image.url);
      const blob = await response.blob();
      await zipWriter.add(fileName, new BlobReader(blob));
    } catch (error) {
      faileds.value.push(fileName);
    }
    progress.value = i + 1;
  }

  await zipWriter.close();
  const blob = await zipFileWriter.getData();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "images.zip";
  a.click();
  isDownloading.value = false;
};
</script>

<template>
  <div
    class="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center z-30"
  >
    <div class="fixed bg-black bg-opacity-30 w-full h-full z-20"></div>
    <div
      class="p-4 w-full md:min-w-[20rem] md:w-auto bg-white shadow-2xl rounded-xl border z-50"
    >
      <h1 class="text-2xl mb-3">Download all images</h1>
      <!-- 显示数量 -->
      <div class="flex justify-between mb-3">
        <div>Total: {{ images.length }}</div>
        <div v-if="isDownloading">
          Progress: {{ progress }} / {{ images.length }}
        </div>
      </div>
      <!-- 显示失败的图片 -->
      <div v-if="faileds.length" class="mb-3">
        <div class="text-red-500 mb-2">Failed({{faileds.length}}):</div>
        <div class="max-w-2xl max-h-52 overflow-auto">
          <div v-for="failed in faileds" :key="failed" class="break-words">
            {{ failed }}
          </div>
        </div>
      </div>
      <div v-if="!isDownloading" class="flex justify-between">
        <button
          class="px-5 py-2 border shadow rounded-lg bg-yellow-700 text-white"
          @click="handelDownload"
        >
          💾 Download
        </button>
        <button
          v-if="!isDownloading"
          class="px-5 py-2 border shadow rounded-lg"
          @click="emit('close')"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
