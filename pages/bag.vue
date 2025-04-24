<template>
  <main>
    <AppHeader title="What's in my bag?" :description="description" />

    <div>
      <div v-for="(category, index) in bag" :key="index">
        <div>
          <h2>
            {{ category.name }}
          </h2>
          <p>
            {{ category.description }}
          </p>
          <div></div>
        </div>

        <div>
          <div v-for="(item, itemIndex) in category.items" :key="itemIndex">
            <div>
              <div>
                <h3>
                  <a v-if="item.url" :href="item.url" target="_blank" rel="noopener noreferrer">
                    {{ item.name }}
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                  <span v-else>{{ item.name }}</span>
                </h3>
              </div>
              <p>
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const description =
  "Software I use, gadgets I love, and other things I recommend. Here's a big list of all of my favorite stuff.";
useSeoMeta({
  title: "Things I use",
  description,
});

const { data: bag } = await useAsyncData('bag', () => {
  return queryCollection('bag')
    .order('order', 'ASC')
    .all();
});
</script>
