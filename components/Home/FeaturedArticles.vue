<template>
  <section class="animate-fade-up stagger-3">
    <h2 class="text-xs font-semibold uppercase tracking-widest text-warm-400 dark:text-warm-500 mb-6">
      Recent Writing
    </h2>
    <ul class="divide-y divide-warm-200 dark:divide-warm-800/50">
      <li v-for="(article, id) in articles" :key="id">
        <AppArticleCard :article="article" />
      </li>
    </ul>
    <div class="mt-6">
      <NuxtLink to="/articles"
                class="text-sm text-warm-500 dark:text-warm-400 hover:text-primary transition-colors">
        All articles &rarr;
      </NuxtLink>
    </div>
  </section>
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
