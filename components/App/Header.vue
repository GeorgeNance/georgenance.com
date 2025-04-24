<template>
  <div>
    <h1 class="text-4xl font-bold">
      {{ title }}
    </h1>
    <p class="text-gray-500 mt-2">
      {{ description }}
    </p>
    <!-- A glowy line -->
    <div class="w-full h-1 bg-gray-500/20 mt-4 rounded-full"></div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
});
</script>
