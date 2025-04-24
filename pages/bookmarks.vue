<template>
  <main>
    <AppHeader title="Bookmarks" :description="description" />
    <ul>
      <li v-for="bookmark in bookmarks" :key="bookmark.id">
        <a :href="bookmark.url" target="_blank">

          <p>
            {{ bookmark.label }}
          </p>
          <span></span>
          <span>
            {{ getHost(bookmark.url) }}
          </span>
        </a>
      </li>
    </ul>
  </main>
</template>

<script setup>
const description =
  "Awesome things I've found on the internet. This page is still WIP, I want to add search like bmrks.com";
useSeoMeta({
  title: "Bookmarks",
  description,
});

const bookmarks = [
  {
    id: 1,
    label: "Oh Sh*t, Git!?!",
    url: "https://ohshitgit.com",
  },
  {
    id: 2,
    label: "Neal.fun - Interesting web games and visuals",
    url: "https://neal.fun"
  },
  {
    id: 3,
    label: "Josh W Comeau - Blog and Tutorials",
    url: "https://www.joshwcomeau.com"
  }
];

function getHost(url) {
  const parsedUrl = new URL(url);
  let host = parsedUrl.host;
  if (host.startsWith("www.")) {
    host = host.substring(4);
  }
  return host;
}

function getThumbnail(url) {
  const host = getHost(url);
  return `https://logo.clearbit.com/${host}`;
}
</script>
