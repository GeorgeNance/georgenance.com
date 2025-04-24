<template>
  <div>
    <h2 v-if="showTitle">
      {{ title }}
    </h2>
    <div class="socials-container">
      <NuxtLink v-for="(link, index) in socialLinks" :key="link.icon" :to="link.url" target="_blank" external
                :aria-label="`Visit ${link.name}`">
        <div class="social-icon">
          <Icon :name="link.icon">
          </Icon>
          <span v-if="showLabels">{{ link.name }}</span>
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
