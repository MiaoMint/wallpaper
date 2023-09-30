<script setup lang="ts">
const apis = [
  {
    name: "Konachan",
    icon: "🌸",
  },
  {
    name: "Wallhaven",
    icon: "🌄",
  },
  {
    name: "Safebooru",
    icon: "👧",
  },
  {
    name: "Gelbooru",
    icon: "🍆",
  },
];
</script>
<template>
  <nav class="px-5 h-16 max-w-[1200px] m-auto flex justify-evenly items-center">
    <NuxtLink to="/" class="text-2xl w-full">
      <div class="flex items-center">
        <span>👏Wallpaper</span>
      </div>
    </NuxtLink>
    <div class="w-full justify-around hidden md:flex">
      <NuxtLink
        v-for="item in apis"
        :key="item.name"
        :to="`/${item.name.toLowerCase()}`"
        class="px-4 py-1 hover:bg-gray-200 rounded flex-shrink-0 mr-2"
        exact-active-class="bg-gray-200"
      >
        <div>
          {{ item.icon }}
          {{ item.name }}
        </div>
      </NuxtLink>
    </div>
    <div class="w-full flex justify-end text-lg">
      <NuxtLink
        to="/favorite"
        class="px-4 py-1 hover:bg-gray-200 rounded"
        exact-active-class="bg-gray-200"
      >
        <div>❤Favorites</div>
      </NuxtLink>
    </div>
  </nav>
</template>
