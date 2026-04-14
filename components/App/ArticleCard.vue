<template>
  <NuxtLink :to="`/articles/${article.slug}`"
            class="group block py-4 -mx-3 px-3 rounded-lg hover:bg-warm-100 dark:hover:bg-warm-800/30 transition-colors">
    <div class="flex items-baseline justify-between gap-4">
      <h3 class="text-base font-medium text-warm-800 dark:text-warm-100 group-hover:text-primary transition-colors">
        {{ article.title }}
      </h3>
      <span v-if="showUnpublishedBadge"
            class="shrink-0 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
        Draft
      </span>
    </div>
    <p class="mt-1 text-sm text-warm-500 dark:text-warm-400 line-clamp-1">
      <span v-if="article.meta?.readingTime" class="text-warm-400 dark:text-warm-500">
        {{ article.meta.readingTime.text }}
      </span>
      <span v-if="article.meta?.readingTime" class="mx-1.5 text-warm-300 dark:text-warm-700">&middot;</span>
      {{ article.description }}
    </p>
  </NuxtLink>
</template>

<script setup>
const { article } = defineProps({
  article: {
    type: Object,
    required: true,
  },
  delayAnimation: {
    type: Number,
    default: 0,
  },
});

const showUnpublishedBadge = process.dev && article.published === false;
</script>
