<template>
  <main class="min-h-screen">
    <AppHeader class="mb-12" title="What's in my bag?" :description="description" />

    <div class="space-y-14">
      <section v-for="(category, index) in bag" :key="index"
               class="animate-fade-up"
               :class="`stagger-${Math.min(index + 1, 5)}`">
        <div class="mb-5">
          <h2 class="text-lg font-serif font-bold text-warm-800 dark:text-warm-50">
            {{ category.name }}
          </h2>
          <p v-if="category.description" class="mt-1 text-sm text-warm-500 dark:text-warm-400">
            {{ category.description }}
          </p>
          <div class="mt-3 h-px w-full bg-warm-200 dark:bg-warm-800/50"></div>
        </div>

        <ul class="space-y-1">
          <li v-for="(item, itemIndex) in category.items" :key="itemIndex">
            <component :is="item.url ? 'a' : 'div'"
                       :href="item.url || undefined"
                       :target="item.url ? '_blank' : undefined"
                       :rel="item.url ? 'noopener noreferrer' : undefined"
                       class="group flex items-start gap-4 -mx-3 px-3 py-3.5 rounded-lg hover:bg-warm-100 dark:hover:bg-warm-800/30 transition-colors">
              <!-- Favicon / Icon -->
              <div class="shrink-0 mt-0.5 w-8 h-8 rounded-md bg-warm-100 dark:bg-warm-800/60 flex items-center justify-center overflow-hidden ring-1 ring-warm-200/80 dark:ring-warm-700/40">
                <img v-if="item.url"
                     :src="getFavicon(item.url)"
                     :alt="item.name"
                     class="w-5 h-5 object-contain"
                     loading="lazy"
                     @error="onImgError" />
                <Icon v-else name="lucide:box" class="w-4 h-4 text-warm-400 dark:text-warm-500" />
              </div>

              <!-- Content -->
              <div class="min-w-0 flex-1">
                <div class="flex items-baseline gap-2">
                  <h3 class="text-base font-medium text-warm-800 dark:text-warm-100 group-hover:text-primary transition-colors">
                    {{ item.name }}
                  </h3>
                  <svg v-if="item.url" class="w-3 h-3 text-warm-300 dark:text-warm-600 shrink-0 translate-y-px opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <p v-if="item.description" class="mt-1 text-sm text-warm-500 dark:text-warm-400 leading-relaxed">
                  {{ item.description }}
                </p>
              </div>
            </component>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<script setup>
const description =
  "Software I use, gadgets I love, and other things I recommend.";
useSeoMeta({
  title: "Bag",
  description,
});

const { data: bag } = await useAsyncData('bag', () => {
  return queryCollection('bag')
    .order('order', 'ASC')
    .all();
});

function getFavicon(url) {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return '';
  }
}

function onImgError(e) {
  e.target.style.display = 'none';
}
</script>
