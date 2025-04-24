<template>
  <main>
    <AppHeader title="Articles" :description="description" />
    <div v-for="(year, index) in sortedYears" :key="index" class="flex flex-col gap-4 mt-4">
      <div class="flex items-center gap-4 mt-4">
        <h2 class="text-xl font-bold">{{ year }}</h2>
        <div class="h-px bg-gray-300 bg-gray-700 flex-grow"></div>
      </div>

      <ul class="flex flex-col gap-4">
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
