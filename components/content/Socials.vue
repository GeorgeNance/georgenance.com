<template>
  <div class="my-10">
    <!-- Ornamental divider -->
    <div class="flex items-center justify-center mb-10" aria-hidden="true">
      <div class="h-px w-20 bg-gradient-to-r from-transparent to-warm-300 dark:to-warm-700"></div>
      <div class="mx-5 w-2 h-2 rotate-45 border border-primary/60 bg-primary/20"></div>
      <div class="h-px w-20 bg-gradient-to-l from-transparent to-warm-300 dark:to-warm-700"></div>
    </div>

    <h2 v-if="showTitle"
        class="text-xs font-semibold uppercase tracking-widest text-warm-400 dark:text-warm-500 mb-6 text-center">
      {{ title }}
    </h2>

    <div class="flex flex-wrap justify-center gap-3 md:gap-4">
      <NuxtLink
        v-for="(link, index) in socialLinks"
        :key="link.icon"
        :to="link.url"
        target="_blank"
        external
        :aria-label="`Connect on ${link.name}`"
        class="group flex items-center gap-2.5 px-6 py-3 rounded-full
               border border-warm-200/80 dark:border-warm-700/50
               bg-warm-100/40 dark:bg-warm-850/50
               hover:border-primary/50 dark:hover:border-primary/40
               hover:bg-primary/[0.04] dark:hover:bg-primary/[0.06]
               transition-all duration-300 ease-out
               hover:-translate-y-0.5 hover:shadow-sm"
        v-motion
        :initial="{ opacity: 0, y: 14 }"
        :enter="{ opacity: 1, y: 0 }"
        :delay="100 * index"
      >
        <Icon
          :name="link.icon"
          class="w-[18px] h-[18px] text-warm-500 dark:text-warm-400
                 group-hover:text-primary transition-colors duration-300"
        />
        <span
          v-if="showLabels"
          class="text-sm font-medium text-warm-600 dark:text-warm-300
                 group-hover:text-warm-800 dark:group-hover:text-warm-100
                 transition-colors duration-300"
        >
          {{ link.name }}
        </span>
        <svg
          class="w-3 h-3 text-warm-400 dark:text-warm-600
                 opacity-0 group-hover:opacity-100
                 group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                 transition-all duration-300"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent } from 'vue';
import type { PropType } from 'vue';

// Define the component for proper registration with Nuxt Content
defineComponent({
  name: 'Socials'
});

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color?: string;
}

// Props for configuration when used in Markdown
const props = defineProps({
  title: {
    type: String,
    default: 'FIND ME ON'
  },
  showTitle: {
    type: Boolean,
    default: true
  },
  showLabels: {
    type: Boolean,
    default: true
  },
  layout: {
    type: String,
    default: 'grid', // 'grid' or 'row'
    validator: (value: string) => ['grid', 'row'].includes(value)
  },
  customLinks: {
    type: Array as PropType<SocialLink[]>,
    default: () => []
  }
});

// Default social links
const defaultLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/GeorgeNance",
    icon: "bi:github"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/georgenance/",
    icon: "bi:linkedin"
  },
  // {
  //   name: "Instagram",
  //   url: "https://www.instagram.com/",
  //   icon: "bi:instagram"
  // }
];

// Use custom links if provided, otherwise use default links
const socialLinks = computed(() =>
  props.customLinks.length > 0 ? props.customLinks : defaultLinks
);
</script>
