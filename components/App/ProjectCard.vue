<template>
  <NuxtLink class="flex items-center justify-between group p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-soft" :to="project.url" target="_blank" external>
    <div>
      <h3 class="text-base font-medium text-gray-900 group-hover:text-forest-700">
        {{ project.name }}
      </h3>
      <p class="text-gray-600 text-sm mt-1">{{ project.description }}</p>
    </div>
    <svg class="w-4 h-4 text-gray-400 group-hover:text-forest-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
    </svg>
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
