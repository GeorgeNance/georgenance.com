<template>
  <div>
    <div class="space-y-0">
      <AppArticleCard v-for="(article, id) in articles" :key="id" :article="article" />
    </div>
    <div class="text-center mt-section">
      <NuxtLink to="/articles" class="text-text-primary hover:opacity-80 transition-opacity">
        View all articles
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: articles } = await useAsyncData("featured-articles", () => {
  let query = queryCollection("article")
    .order('date', 'DESC')
    .limit(3);

  // Only filter by published in production
  if (!process.dev) {
    query = query.where("published", "=", true);
  }

  return query.all();
});
</script>
