<template>
  <div>
    This component was inspired by
    <NuxtLink :to="link" external target="_blank">
      {{ label }}</NuxtLink>.
  </div>
</template>

<script setup>
defineProps({
  label: String,
  link: String,
});
</script>
