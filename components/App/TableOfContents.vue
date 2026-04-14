<template>
  <div>
    <!-- Collapsed: vertical "Contents" label -->
    <button v-if="!visible"
            @click="visible = true"
            class="group flex items-center gap-2 cursor-pointer"
            title="Show table of contents">
      <span class="text-xs font-semibold uppercase tracking-widest text-warm-400 dark:text-warm-500 group-hover:text-primary transition-colors"
            style="writing-mode: vertical-lr;">Contents</span>
      <span class="w-px h-16 bg-warm-300 dark:bg-warm-700 group-hover:bg-primary transition-colors"></span>
    </button>

    <!-- Expanded: full TOC -->
    <div v-else
         class="bg-warm-100 dark:bg-warm-850 rounded-lg p-5 border border-warm-200 dark:border-warm-800/50 max-w-xs">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-warm-800 dark:text-warm-100 text-xs tracking-widest font-semibold uppercase">
          Contents
        </h2>
        <button @click="visible = false"
                class="text-warm-400 dark:text-warm-500 hover:text-warm-700 dark:hover:text-warm-200 transition-colors p-0.5"
                title="Hide table of contents">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav>
        <ul class="space-y-2.5">
          <li v-for="link of toc.links" :key="link.id" :class="{
            'pl-4': link.depth === 3
          }" class="relative">
            <a @click.prevent="scrollToSection(link)" :class="{
              'text-primary-100': link.id === currentlyActiveToc,
              'text-warm-500 dark:text-warm-400 hover:text-primary dark:hover:text-primary': link.id !== currentlyActiveToc
            }" class="block text-sm transition-colors duration-200 py-0.5 font-medium" :style="{
              opacity: link.id === currentlyActiveToc ? '1' : '0.65'
            }" :href="`#${link.id}`">
              <span class="relative">
                <span v-if="link.id === currentlyActiveToc"
                      class="absolute -left-3.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full">
                </span>
                {{ link.text }}
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toc: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      visible: true,
      currentlyActiveToc: "",
      observer: null,
      navbarHeight: 64,
      targetViewportOffset: 0.3,
      observerOptions: {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      }
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        if (entry.isIntersecting) {
          this.currentlyActiveToc = id;
        }
      });
    }, this.observerOptions);

    document
      .querySelectorAll(".article-body h2[id], .article-body h3[id]")
      .forEach(section => {
        this.observer.observe(section);
      });
  },
  methods: {
    scrollToSection(link) {
      const element = document.getElementById(link.id);
      if (!element) return;

      const viewportOffset = window.innerHeight * this.targetViewportOffset;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - viewportOffset - this.navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  },
  beforeDestroy() {
    this.observer.disconnect();
  }
};
</script>
