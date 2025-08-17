<template>
  <div class="mb-section">
    <h1 class="text-article-xl font-bold text-text-primary mb-4">
      {{ title }}
    </h1>
    <p v-if="description" class="text-body-lg text-text-secondary">
      {{ description }}
    </p>
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
