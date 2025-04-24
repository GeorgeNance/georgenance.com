<template>
  <div>
    <div>
      <h2>
        Table of contents
      </h2>
      <!-- <pre><code>
      {{ toc }}
    </code></pre> -->
      <nav>
        <ul>
          <li v-for="link of toc.links" :key="link.id" :class="{
            'pl-4': link.depth === 3
          }">
            <a @click.prevent="scrollToSection(link)" :class="{
              'text-primary-100 hover:text-primary-500': link.id === currentlyActiveToc,
              'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary': link.id !== currentlyActiveToc
            }" :style="{
              opacity: link.id === currentlyActiveToc ? '1' : '0.7'
            }" :href="`#${link.id}`">
              <span>
                {{ link.text }}
                <span v-if="link.id === currentlyActiveToc">
                </span>
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