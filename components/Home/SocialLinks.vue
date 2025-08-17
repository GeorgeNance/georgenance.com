<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-600 mb-4 tracking-wider">FIND ME ON</h2>
    <div class="space-y-5 flex flex-row justify-evenly">
      <NuxtLink v-for="link in links" :key="link.icon" :to="link.url" target="_blank" external
                class="flex items-end gap-2 text-gray-700 hover:text-forest-700 group transition-colors duration-200">
        <div v-motion :enter="{
          opacity: 1,
          y: 0,
          scale: 1,
        }" :hovered="{
          scale: 1.05,

        }">
          <Icon :name="link.icon" class="w-6 h-6 mr-1"></Icon>
          <span class="text-sm">
            {{ link.name }}
          </span>
        </div>



      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const links = [
  // {
  //   name: "𝕏 (Twitter)",
  //   url: "https://twitter.com/GeoNance",
  //   icon: "bi:twitter-x",
  // },
  {
    name: "GitHub",
    url: "https://github.com/GeorgeNance",
    icon: "bi:github",
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/georgenance/",
    icon: "bi:linkedin",
  },

];
</script>
