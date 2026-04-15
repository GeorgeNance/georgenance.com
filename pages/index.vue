<template>
  <main class="min-h-screen max-w-3xl mx-auto px-6 py-12 sm:py-16 lg:py-20">
    <div class="space-y-16 sm:space-y-20">
      <HomeIntro />
      <HomeFeaturedArticles />
      <Socials :showTitle="false" class="animate-fade-up stagger-4" />
    </div>
  </main>
</template>

<script setup>
import Socials from '~/components/content/Socials.vue'
</script>
