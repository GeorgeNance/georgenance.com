<template>
  <li>
    <NuxtLink :to="item.url" target="_blank" external>
      <p>
        {{ item.name }}
      </p>
      <p>{{ item.description }}</p>
    </NuxtLink>
  </li>
</template>

<script setup>
defineProps({
  item: Object,
  required: true,
});
</script>
