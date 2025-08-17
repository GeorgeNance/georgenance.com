<template>
  <div>
    <div class="bg-white rounded-lg p-6 shadow-soft max-w-xs">
      <h2 class="text-gray-900 text-sm font-bold tracking-wide uppercase mb-4">
        Table of contents
      </h2>
      
      <nav>
        <ul class="space-y-2">
          <li v-for="link of toc.links" :key="link.id" :class="{
            'pl-4': link.depth === 3
          }" class="relative">
            <a @click.prevent="scrollToSection(link)" 
               class="block text-sm transition-all duration-200 ease-in-out py-2 px-2 rounded-lg font-medium hover:bg-forest-50"
               :class="{
                 'text-forest-800 bg-forest-50 font-semibold': link.id === currentlyActiveToc,
                 'text-gray-600 hover:text-forest-700': link.id !== currentlyActiveToc
               }" 
               :href="`#${link.id}`">
              <span class="relative flex items-center">
                <span v-if="link.id === currentlyActiveToc"
                      class="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-4 bg-forest-600 rounded-full">
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
      currentlyActiveToc: "",
      observer: null,
      navbarHeight: 64, // 4rem/16 tailwind class
      // Define a consistent target position for both scrolling and intersection
      targetViewportOffset: 0.3, // 30% from top
      observerOptions: {
        root: null,
        // Make the intersection band match our scroll target position
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

    // Track all sections that have an `id` applied
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

      // Use the same targetViewportOffset for consistency
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

<style></style>