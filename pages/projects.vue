<template>
  <main>
    <AppHeader title="Projects" :description="description" />
    <div>

    </div>
  </main>
</template>

<script setup>
const description =
  "Coming soon! I'm working on a few projects that I can't wait to share. Stay tuned!";
useSeoMeta({
  title: "Projects",
  description,
});

// const { data: projects } = await useAsyncData("projects-all", () =>
//   queryContent("/projects").find()
// );
</script>
