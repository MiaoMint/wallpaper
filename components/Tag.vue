<script setup>
const { selected, tag } = defineProps({
  selected: {
    type: Boolean,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    :class="[
      'mr-3 mb-2 cursor-pointer hover:text-yellow-600',
      {
        'text-yellow-600': selected,
      },
    ]"
  >
    #{{ tag }}
  </div>
</template>
