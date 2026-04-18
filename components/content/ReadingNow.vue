<template>
  <div v-if="books && books.length" class="my-12 not-prose">
    <div class="mb-5">
      <h2 class="text-lg font-serif font-bold text-warm-800 dark:text-warm-50">
        Reading
      </h2>
      <div class="mt-3 h-px w-full bg-warm-200 dark:bg-warm-800/50"></div>
    </div>

    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-5">
      <a
        v-for="book in books"
        :key="book.url"
        :href="book.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group"
      >
        <div class="aspect-[2/3] rounded overflow-hidden bg-warm-200 dark:bg-warm-800 shadow-sm ring-1 ring-warm-200/60 dark:ring-warm-700/30">
          <img
            v-if="book.coverUrl"
            :src="book.coverUrl"
            :alt="book.title"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <p class="mt-2 text-sm leading-snug text-warm-700 dark:text-warm-200 group-hover:text-primary transition-colors line-clamp-2">
          {{ book.title }}
        </p>
        <p class="text-xs text-warm-400 dark:text-warm-500 mt-0.5">
          {{ book.author }}
        </p>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Book {
  title: string
  author: string
  coverUrl: string
  url: string
  pages: number | null
  averageRating: string
  dateAdded: string
}

const props = defineProps({
  limit: { type: Number, default: 5 },
})

const { data: books } = await useFetch<Book[]>('/api/goodreads', {
  default: () => [],
  transform: (data) => data.slice(0, props.limit),
})
</script>
