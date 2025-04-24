<template>
  <NuxtLink :to="project.url" target="_blank" external>
    <div>
      <h3>
        {{ project.name }}
      </h3>
      <p>{{ project.description }}</p>
    </div>
    <div></div>

  </NuxtLink>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>
