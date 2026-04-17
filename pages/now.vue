<template>
  <main v-if="page" class="min-h-screen mb-32">
    <AppHeader
      class="mb-12 animate-fade-up stagger-1"
      :title="page.title"
      :description="`Updated ${readableDate(page.updated_at)}`"
    />

    <div class="animate-fade-up stagger-2">
      <ContentRenderer
        :value="page"
        class="now-content prose prose-lg dark:prose-invert
               prose-headings:font-serif prose-headings:tracking-tight
               prose-a:text-primary prose-a:decoration-primary/30
               hover:prose-a:decoration-primary
               prose-a:underline-offset-4 prose-a:transition-colors
               mx-auto"
      />
    </div>

    <footer class="mt-20 animate-fade-up stagger-4">
      <div class="h-px w-full bg-warm-200 dark:bg-warm-800/50 mb-6"></div>
      <p class="text-sm text-warm-400 dark:text-warm-600">
        This is a
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          class="text-warm-500 dark:text-warm-400 underline underline-offset-4 decoration-warm-300 dark:decoration-warm-700 hover:text-primary hover:decoration-primary transition-colors"
        >now page</a>.
      </p>
    </footer>
  </main>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('now', () => {
  return queryCollection('page').path('/now').first()
})

if (!page.value) {
  throw createError({ statusCode: 404, message: 'Page not found' })
}

useSeoMeta({
  title: page.value.title,
  description: page.value.description || 'What I am currently doing',
})

function readableDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.now-content :deep(hr),
.now-content :deep(hr + p) {
  display: none;
}
</style>
