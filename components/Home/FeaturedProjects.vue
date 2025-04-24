<template>
  <div>
    <h2>
      FEATURED PROJECTS
    </h2>
    <div>
      <AppProjectCard v-for="(project, id) in projects" :key="id" :project="project" />
    </div>
    <div>
      <NuxtLink label="All Projects &rarr;" to="/projects" variant="link" color="gray" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// const { data: projects } = await useAsyncData("projects-home", () =>
//   queryContent("/projects").limit(3).find()
// );
</script>
