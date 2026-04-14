<template>
  <div>
    <h1 class="text-2xl font-bold tracking-tight text-warm-800 dark:text-warm-50 font-serif">
      {{ title }}
    </h1>
    <p v-if="description" class="mt-4 text-base text-warm-500 dark:text-warm-400">
      {{ description }}
    </p>
    <div class="mt-6 h-px w-full bg-warm-200 dark:bg-warm-800/50"></div>
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
