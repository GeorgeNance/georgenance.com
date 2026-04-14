<template>
  <main class="min-h-screen">
    <AppHeader class="mb-8" title="Articles" :description="description" />
    <div v-for="(year, index) in sortedYears" :key="index" class="mt-8 first:mt-6">
      <h2 class="flex items-center gap-4 text-sm font-semibold uppercase tracking-widest text-warm-400 dark:text-warm-500 mb-1">
        {{ year }}
        <span class="flex-1 flex items-center gap-3">
          <span class="flex-1 h-px bg-warm-200 dark:bg-warm-800"></span>
          <span class="h-2 w-2 rotate-45 border border-warm-300 dark:border-warm-700"></span>
        </span>
      </h2>
      <ul>
        <li v-for="(article, id) in groupedArticles[year]" :key="article._path">
          <AppArticleCard :article="article" :delay-animation="articleDelays[id]" />
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
const route = useRoute();

const description =
  "All of my long-form thoughts on programming, user interfaces, product design, and more, collected in chronological order.";
useSeoMeta({
  title: "Articles",
  description,
});

const { data: articles } = await useAsyncData(route.path, () => {
  let query = queryCollection("article")
    .order('date', 'DESC');

  // Only filter by published in production
  if (!process.dev) {
    query = query.where("published", "=", true);
  }

  return query.all();
});

// Debug logging
console.log("Articles query result:", articles.value);
if (articles.value) {
  articles.value.forEach(article => {
    console.log(`Article "${article.title}":`, {
      published: article.published,
      publishedType: typeof article.published,
      date: article.date,
      slug: article.slug
    });
  });
}

const groupedArticles = computed(() => {
  if (!articles.value) return {};

  return articles.value.reduce((acc, article) => {
    const year = new Date(article.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(article);
    return acc;
  }, {});
});


// Add a new computed property for sorted years
const sortedYears = computed(() => {
  return Object.keys(groupedArticles.value)
    .map(Number)
    .sort((a, b) => b - a);
});


const articleDelays = computed(() => {
  let delayMap = {};
  let delay = 0;

  for (const article of articles.value.sort((a, b) => new Date(b.date) - new Date(a.date))) {
    delay += 100;
    delayMap[article.id] = delay;
  }

  return delayMap;
});
console.log(articleDelays.value);
</script>
