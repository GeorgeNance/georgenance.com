<template>
  <div v-if="post" class="mb-32">
    <main class="min-h-screen max-w-reading mx-auto px-6 py-16">
      <article class="w-full">
        <!-- Article header -->
        <header class="mb-12">
          <div v-if="post.published === false" class="bg-gray-100 text-gray-700 rounded-lg p-4 mb-8">
            This article is not published yet.
          </div>
          
          <h1 class="font-bold text-text-primary mb-8 text-5xl leading-tight tracking-tight font-sans custom-article-title">
            {{ post.title }}
          </h1>
          
          <div class="flex items-center text-meta text-text-tertiary mb-12">
            <span>George Nance</span>
            <span class="mx-2">·</span>
            <time :datetime="post.date">{{ getReadableDate(post.date) }}</time>
            <span v-if="post.meta?.readingTime" class="mx-2">·</span>
            <span v-if="post.meta?.readingTime">{{ post.meta.readingTime.text }}</span>
          </div>
        </header>

        <!-- Article content -->
        <div class="prose max-w-none">
          <ContentRenderer v-if="post" :value="post" ref="articleBody" />
        </div>

      </article>
    </main>
    <div class="max-w-reading mx-auto px-6 mt-section">
      <div class="border-t border-border-light pt-8">
        <p class="text-body text-text-secondary text-center mb-8">
          Thanks for reading! If you enjoyed this article, please share it.
        </p>
        <HomeSubscribe />
      </div>
    </div>
  </div>
</template>
<script setup>
const route = useRoute();
const slug = route.params.slug;

// Fetch the article
const { data: post } = await useAsyncData(`article-${slug}`, () => {
  let query = queryCollection('article')
    .where('slug', '=', slug);

  // Only filter by published in production
  if (!import.meta.dev) {
    query = query.where('published', '=', true);
  }

  return query.first();
});

// Handle 404 if article not found or not published
if (!post.value) {
  throw createError({
    statusCode: 404,
    message: 'Article not found'
  });
}



// Only set meta tags if we have post data
if (post.value) {
  useSeoMeta({
    title: post.value.title,
    description: post.value.description,
    twitterCard: "summary_large_image",
    articleAuthor: "George Nance",
    articlePublishedTime: post.value.date,
    twitterDescription: post.value.description,
  });

  if (post.value.ogImage) {
    defineOgImage(`${post.value.ogImage}`)
  } else {
    defineOgImageComponent('BlogPost', {
      title: post.value.title,
      subTitle: post.value.description,
    })
  }
}

const getReadableDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>
<style></style>
