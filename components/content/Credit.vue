<template>
  <div class="text-sm p-4 bg-paper-100 border border-outline-100 text-ink-300 text-center rounded-lg shadow-paper">
    This component was inspired by
    <NuxtLink :to="link" external target="_blank" class="underline font-medium">
      {{ label }}</NuxtLink
    >.
  </div>
</template>

<script setup>
defineProps({
  label: String,
  link: String,
});
</script>
