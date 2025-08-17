<template>
  <NuxtLink :to="`/articles/${article.slug}`" class="block group">
    <article class="py-article border-b border-border-light last:border-b-0">
      <!-- Article Title -->
      <h2 class="text-article-md font-bold text-text-primary group-hover:opacity-80 transition-opacity mb-3 leading-tight">
        {{ article.title }}
      </h2>
      
      <!-- Article Preview/Description -->
      <p class="text-body text-text-secondary mb-4 leading-relaxed">
        {{ article.description }}
      </p>
      
      <!-- Article Meta -->
      <div class="flex items-center text-meta text-text-tertiary">
        <span>George Nance</span>
        <span class="mx-2">·</span>
        <time :datetime="article.date">{{ formatDate(article.date) }}</time>
        <span v-if="article.meta?.readingTime" class="mx-2">·</span>
        <span v-if="article.meta?.readingTime">{{ article.meta.readingTime.text }}</span>
        <span v-if="showUnpublishedBadge" class="ml-3 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
          Unpublished
        </span>
      </div>
    </article>
  </NuxtLink>
</template>

<script setup>
const { article } = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

// Check if we're in dev mode and article is unpublished
const showUnpublishedBadge = process.dev && article.published === false;

// Format date in Substack style
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
</script>