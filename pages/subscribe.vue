<template>
  <main>
    <AppHeader title="Subscribe" :description="description" />

  </main>
</template>

<script setup>
const description =
  "If you like what I'm doing, you can subscribe to my newsletter to get updates on my projects and thoughts.";
useSeoMeta({
  title: "Subscribe to George Nance's Newsletter",
  description,
});



function getHost(url) {
  const parsedUrl = new URL(url);
  let host = parsedUrl.host;
  if (host.startsWith("www.")) {
    host = host.substring(4);
  }
  return host;
}


</script>
