<template>
  <div v-if="post" class="mb-32">
    <main class="min-h-screen py-12 sm:py-16 lg:py-20">
      <div class="relative">
        <article class="w-full font-serif">
          <div v-if="post.published === false" class="bg-yellow-100 text-yellow-800 rounded-lg p-4 mb-6">
            This article is not published yet.
          </div>
          <header class="animate-fade-up stagger-1">
            <h1 class="text-4xl sm:text-5xl text-warm-800 dark:text-warm-50 font-serif font-bold mb-4 mt-0 leading-tight">{{ post.title }}</h1>
            <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-warm-400 dark:text-warm-400 font-sans tracking-wide">
              <time :datetime="post.date">{{ getReadableDate(post.date) }}</time>
              <template v-if="post.meta?.readingTime">
                <span class="text-warm-300 dark:text-warm-700">&middot;</span>
                <span>{{ post.meta.readingTime.text }}</span>
              </template>
              <template v-if="post.tags?.length">
                <span class="text-warm-300 dark:text-warm-700">&middot;</span>
                <span v-for="(tag, index) in post.tags" :key="index">
                  <NuxtLink :to="`/tags/${tag}`"
                            class="text-primary hover:text-primary-100 transition-colors">
                    #{{ tag }}</NuxtLink>
                </span>
              </template>
            </div>
            <div class="mt-6 h-px bg-warm-200 dark:bg-warm-800"></div>
          </header>
        </article>

        <div class="w-full mt-10">
          <ContentRenderer v-if="post" :value="post"
                           class="article-body prose prose-lg dark:prose-invert prose-blockquote:not-italic prose-img:ring-1 prose-img:ring-warm-200 dark:prose-img:ring-white/10 prose-img:rounded-lg prose-headings:scroll-mt-24"
                           ref="articleBody" />
        </div>

        <!-- TOC floats outside content column on wide screens -->
        <aside v-if="!post.hide_toc && post.body?.toc?.links?.length > 2"
               class="hidden xl:block absolute top-0 bottom-0"
               style="left: calc(100% + 4rem); width: 200px;">
          <div class="sticky top-32">
            <AppTableOfContents :toc="post.body.toc" />
          </div>
        </aside>
      </div>
    </main>
    <div class="mt-32 text-center space-y-6">
      <p class="text-lg text-warm-500 dark:text-warm-400">Thank you for reading! If you got any value from this, please
        share it</p>
      <HomeSocialLinks class="mt-4" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const slug = route.params.slug;

const { data: post } = await useAsyncData(`article-${slug}`, () => {
  let query = queryCollection('article')
    .where('slug', '=', slug);

  if (!import.meta.dev) {
    query = query.where('published', '=', true);
  }

  return query.first();
});

if (!post.value) {
  throw createError({
    statusCode: 404,
    message: 'Article not found'
  });
}

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
