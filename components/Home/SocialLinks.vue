<template>
  <section class="animate-fade-up stagger-4">
    <h2 class="text-xs font-semibold uppercase tracking-widest text-warm-400 dark:text-warm-500 mb-4">
      Elsewhere
    </h2>
    <div class="flex gap-5">
      <NuxtLink v-for="link in links" :key="link.icon" :to="link.url" target="_blank" external
                class="flex items-center gap-1.5 text-sm text-warm-500 dark:text-warm-400 hover:text-primary transition-colors">
        <Icon :name="link.icon" class="w-4 h-4" />
        <span>{{ link.name }}</span>
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
const links = [
  {
    name: "GitHub",
    url: "hIt ittps://github.com/GeorgeNance",
    icon: "bi:github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/georgenance/",
    icon: "bi:linkedin",
  },
];
</script>
