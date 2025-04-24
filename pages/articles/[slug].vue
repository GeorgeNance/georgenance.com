<template>
  <div v-if="post">
    <main>
      <div>
        <div>
          <div>
            <article>
              <div class="text-white bg-red-500/50 rounded-md px-2 py-2" v-if="post.published === false">
                This article is not published yet.
              </div>
              <h1 class="text-4xl font-bold">{{ post.title
              }}</h1>
              <div class="flex gap-4 mt-2">
                <div class="text-gray-500">By George Nance</div>
                <span class="">❖</span>
                <div class="flex flex-row gap-1 text-gray-500">
                  <span class=""><time class="" :datetime="post.date">{{
                    getReadableDate(post.date) }}</time></span>

                  <span class="">❖</span>
                  <span class="" v-if="post.meta?.readingTime">{{ post.meta.readingTime.text
                  }}</span>
                </div>

              </div>
            </article>
          </div>
          <hr class="my-4" />
          <div>
            <span class="text-gray-500/50" v-for="(tag, index) in post.tags" :key="index">
              <NuxtLink :to="`/tags/${tag}`">
                #{{ tag }}</NuxtLink>
            </span>
          </div>
          <div class="mt-4">
            <ContentRenderer v-if="post" :value="post" ref="articleBody" class="prose " />
          </div>
        </div>

        <aside v-if="!post.hide_toc && post.body?.toc?.links?.length > 2" style="width: 280px; height: fit-content;">
          <AppTableOfContents :toc="post.body.toc" />
        </aside>
      </div>
    </main>
    <div class="mt-8">
      <p>Thank you for reading! If you got any value from this, please
        share it 😌</p>
      <HomeSocialLinks />
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
