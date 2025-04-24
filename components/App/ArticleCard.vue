<template>
  <NuxtLink :to="`/articles/${article.slug}`" class="py-4 ">
    <article>
      <div>
        <h2 class="text-xl font-bold">
          {{ article.title }} <span class="text-gray-500 font-normal text-sm" v-if="article.meta.readingTime">
            {{ article.meta.readingTime.text }}
          </span>
        </h2>
        <span v-if="showUnpublishedBadge" class="text-white bg-red-500/50 rounded-md px-2 py-2 font-normal text-sm">
          Unpublished
        </span>
      </div>


    </article>
  </NuxtLink>
</template>

<script setup>
const { article, delayAnimation } = defineProps({
  article: {
    type: Object,
    required: true,
  },
  delayAnimation: {
    type: Number,
    default: 0,
  },
});

// Check if we're in dev mode and article is unpublished
const showUnpublishedBadge = process.dev && article.published === false;
</script>