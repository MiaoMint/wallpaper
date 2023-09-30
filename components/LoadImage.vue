<script setup lang="ts">
const { src, alt } = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
  },
});

const progress = ref(0);
const error = ref<Error>();
const srcUrl = ref("");
const loading = ref(true);

const fetchImage = async () => {
  try {
    const res = await fetch(`/api/image?url=${src}`);
    if (!res.ok) {
      throw new Error("Not ok");
    }
    const reader = res.body?.getReader();
    if (!reader) {
      throw new Error("No reader");
    }
    const contentLength = Number(res.headers.get("Content-Length"));
    let receivedLength = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      if (!value) {
        continue;
      }
      chunks.push(value);
      receivedLength += value.length;
      progress.value = receivedLength / contentLength;
    }
    const blob = new Blob(chunks);
    const url = URL.createObjectURL(blob);
    srcUrl.value = url;
  } catch (e) {
    console.log(e);
    error.value = e as Error;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchImage();
});

onUnmounted(() => {
  URL.revokeObjectURL(srcUrl.value);
});
</script>
<template>
  <div>
    <slot v-if="error" name="error" :error="error" />
    <slot v-else-if="loading" name="progress" :progress="progress" />
    <slot v-else name="img" :src="srcUrl" :alt="alt" />
  </div>
</template>
