<template>
  <div
       class="my-8 p-6 rounded-2xl bg-paper-50 transition-all duration-300 shadow-page border border-outline-100">
    <h2 v-if="showTitle"
        class="text-base font-bold uppercase tracking-wider text-ink-400 mb-6 text-center relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-0.5 after:bg-forest-600 after:rounded-full">
      {{ title }}
    </h2>
    <div class="grid grid-cols-2 md:grid-cols-2 gap-5"
         :class="layout === 'row' ? 'md:flex md:flex-wrap md:justify-center' : ''">
      <NuxtLink v-for="(link, index) in socialLinks" :key="link.icon" :to="link.url" target="_blank" external
                class="flex flex-col items-center p-4 rounded-xl bg-paper-100 border border-outline-100 text-ink-400 transition-all duration-300 hover:bg-forest-50 hover:shadow-page hover:-translate-y-1 group"
                :class="layout === 'row' ? 'md:min-w-[120px]' : ''" :aria-label="`Visit ${link.name}`">
        <div v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }"
             :hovered="{ scale: 1.05 }" :delay="100 * index" class="flex flex-col items-center gap-3 w-full"
             :class="layout === 'row' ? 'md:flex-row md:justify-center' : ''">
          <Icon :name="link.icon"
                class="w-8 h-8 text-ink-300 group-hover:text-forest-700 transition-all duration-300 group-hover:scale-110">
          </Icon>
          <span v-if="showLabels" class="text-sm font-semibold text-center">{{ link.name }}</span>
        </div>
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
