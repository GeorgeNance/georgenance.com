<template>
  <NuxtLoadingIndicator color="#D4A853" />
  <div class="min-h-screen bg-warm-50 dark:bg-warm-950 text-warm-600 dark:text-warm-300 transition-colors duration-300 overflow-x-clip">
    <AppNavbar />
    <div class="h-24 md:h-28"></div>
    <NuxtLayout />
    <div class="h-20"></div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: '%s | George Nance',
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
</style>
