<template>
  <div>
    <Hero class="mb-8" />
    <div class="mb-8 text-2xl">Wallhaven</div>
    <div class="mb-8">
      <GridList v-if="!pending && !error" :data="data!" />
      <div v-if="pending">Loading...</div>
      <div v-if="error">Error</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data, pending, error } = useFetch("/api/wallhaven/latest");
</script>
