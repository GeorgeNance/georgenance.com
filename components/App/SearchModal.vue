<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog @close="close" class="relative z-[100]">
      <TransitionChild
        enter="ease-out duration-200"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-150"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-warm-950/60 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto p-4 pt-[20vh]">
        <TransitionChild
          enter="ease-out duration-200"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-150"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel class="mx-auto max-w-xl overflow-hidden rounded-xl bg-warm-50 dark:bg-warm-900 shadow-2xl ring-1 ring-warm-200 dark:ring-warm-700/50">
            <div class="flex items-center gap-3 border-b border-warm-200 dark:border-warm-700/50 px-4">
              <Icon name="lucide:search" class="size-4 shrink-0 text-warm-400 dark:text-warm-500" />
              <input
                ref="inputRef"
                v-model="query"
                type="text"
                placeholder="Search articles..."
                class="h-12 w-full bg-transparent text-sm text-warm-800 dark:text-warm-100 placeholder-warm-400 dark:placeholder-warm-500 focus:outline-none"
                @keydown.down.prevent="moveSelection(1)"
                @keydown.up.prevent="moveSelection(-1)"
                @keydown.enter.prevent="goToSelected"
              />
              <kbd class="hidden sm:inline-flex shrink-0 items-center rounded border border-warm-200 dark:border-warm-700 px-1.5 py-0.5 text-[10px] font-medium text-warm-400 dark:text-warm-500">
                ESC
              </kbd>
            </div>

            <ul v-if="results.length" ref="listRef" class="max-h-72 overflow-y-auto py-2">
              <li v-for="(article, i) in results" :key="article.slug">
                <NuxtLink
                  :to="`/articles/${article.slug}`"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
                  :class="i === selectedIndex
                    ? 'bg-primary/10 text-primary'
                    : 'text-warm-600 dark:text-warm-300 hover:bg-warm-100 dark:hover:bg-warm-800/50'"
                  @click="close"
                  @mouseenter="selectedIndex = i"
                >
                  <Icon name="lucide:file-text" class="size-4 shrink-0 opacity-50" />
                  <div class="min-w-0">
                    <p class="truncate font-medium">{{ article.title }}</p>
                    <p class="truncate text-xs opacity-60">{{ article.description }}</p>
                  </div>
                </NuxtLink>
              </li>
            </ul>

            <div v-else-if="query" class="px-4 py-8 text-center text-sm text-warm-400 dark:text-warm-500">
              No articles found for "{{ query }}"
            </div>

            <div v-else class="px-4 py-8 text-center text-sm text-warm-400 dark:text-warm-500">
              Start typing to search articles...
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue';

const router = useRouter();

const isOpen = ref(false);
const query = ref('');
const selectedIndex = ref(0);
const inputRef = ref(null);
const listRef = ref(null);

const { data: articles } = await useAsyncData('search-articles', () => {
  let q = queryCollection('article').order('date', 'DESC');
  if (!process.dev) {
    q = q.where('published', '=', true);
  }
  return q.all();
});

const results = computed(() => {
  const q = query.value.toLowerCase().trim();
  if (!q || !articles.value) return [];

  return articles.value.filter((article) => {
    return (
      article.title?.toLowerCase().includes(q) ||
      article.description?.toLowerCase().includes(q) ||
      article.tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  });
});

watch(query, () => {
  selectedIndex.value = 0;
});

function open() {
  isOpen.value = true;
  query.value = '';
  selectedIndex.value = 0;
  nextTick(() => inputRef.value?.focus());
}

function close() {
  isOpen.value = false;
}

function moveSelection(delta) {
  if (!results.value.length) return;
  selectedIndex.value = (selectedIndex.value + delta + results.value.length) % results.value.length;

  nextTick(() => {
    listRef.value?.children[selectedIndex.value]?.scrollIntoView({ block: 'nearest' });
  });
}

function goToSelected() {
  const article = results.value[selectedIndex.value];
  if (article) {
    router.push(`/articles/${article.slug}`);
    close();
  }
}

onMounted(() => {
  const onKeydown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      isOpen.value ? close() : open();
    }
  };
  window.addEventListener('keydown', onKeydown);
  onUnmounted(() => window.removeEventListener('keydown', onKeydown));
});

defineExpose({ open });
</script>
