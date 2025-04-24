<template>
  <li>
    <div>
      <span>{{ title }}</span>
      <hr />
      <!-- Line -->


    </div>
  </li>
</template>

<script lang="ts" setup>
defineProps({
  title: String,
});
</script>
