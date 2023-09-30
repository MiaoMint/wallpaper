<script setup lang="ts">
onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      useRouter().push("/search");
    }
  });
});
</script>
<template>
  <nav class="px-5 h-16 max-w-[1200px] m-auto flex justify-evenly items-center">
    <NuxtLink to="/" class="text-2xl w-full">
      <div class="flex items-center">
        <span>👏Wallpaper</span>
      </div>
    </NuxtLink>

    <div class="w-full flex justify-end items-center md:text-lg">
      <NuxtLink to="/search" class="mr-3" active-class="hidden">
        <!-- 一个假的搜索框 -->
        <div class="w-full border rounded-3xl hidden md:block">
          <div class="border-gray-300 px-3 py-1 w-96 flex justify-between">
            <span class="text-gray-400 pr-4">Search...</span>
            <!-- kbd ctrl + k -->
            <kbd class="ml-2 text-gray-400">ctrl + K</kbd>
          </div>
        </div>
        <div class="md:hidden">🔍</div>
      </NuxtLink>
      <NuxtLink
        to="/favorite"
        class="px-2 md:px-4 py-1 hover:bg-gray-200 rounded"
        exact-active-class="bg-gray-200"
      >
        <div>❤Favorites</div>
      </NuxtLink>
    </div>
  </nav>
</template>
