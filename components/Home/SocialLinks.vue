<template>
  <div>
    <h2>FIND ME ON</h2>
    <div>
      <NuxtLink v-for="link in links" :key="link.icon" :to="link.url" target="_blank" external>
        <div v-motion :enter="{
          opacity: 1,
          y: 0,
          scale: 1,
        }" :hovered="{
          scale: 1.05,

        }">
          <Icon :name="link.icon"></Icon>
          <span>
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
