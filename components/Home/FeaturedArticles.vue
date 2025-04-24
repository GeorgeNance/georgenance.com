<template>
  <div>
    <h2>
      RECENT ARTICLES
    </h2>
    <ul>
      <li v-for="(article, id) in articles" :key="id">
        <AppArticleCard :article="article" />
      </li>
    </ul>
    <div>
      <NuxtLink label="All Articles &rarr;" to="/articles" variant="link" color="gray" />
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
