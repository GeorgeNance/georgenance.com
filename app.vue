<template>
  <NuxtLoadingIndicator color="#14b8a6" />
  <div class="bg-emerald-100">


    <NuxtLayout />

    <AppFooter />




  </div>
</template>

<script setup lang="ts">
useHead({
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: '%s | George Nance',
})


</script>

<style></style>
