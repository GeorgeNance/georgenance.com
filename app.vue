<template>
  <NuxtLoadingIndicator color="#0f4c3a" />
  <div class="min-h-screen bg-white">
    
    <!-- Content area -->
    <div class="relative">



    <AppNavbar />
      <div class="h-32"></div>
      <main class="relative">
        <NuxtLayout />
      </main>
      <div class="h-32"></div>
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  // as a string,
  // where `%s` is replaced with the title
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
