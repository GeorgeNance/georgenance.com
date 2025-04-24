<template>
  <div>
    <NuxtImg ref="avatar" src="/img/profile.jpg" alt="George Nance" draggable="false" placeholder format="webp" />

    <h1 class="text-4xl font-bold">
      Welcome!👋
    </h1>
    <p class="text-gray-500 mt-2" ref="description">
      I'm <NuxtLink to="/about">George Nance</NuxtLink>, I'm a full stack developer
      based in Phoenix,
      AZ.
      I am
      passionate about technology and all
      things nerdy. Sometimes I write and publish it here.
    </p>
    <p>
      If you are curious what I am up to, checkout my <NuxtLink to="/now">Now</NuxtLink> page. If
      you would like to get in contact with me, please reach out to me via the social links below.
    </p>
  </div>
</template>

<script setup>

useSeoMeta({
  title: "Home",
  description:
    "I'm George Nance, a Full Stack Web Developer from the sunny landscapes of Phoenix, Arizona. My passion lies in leveraging the latest technologies to craft accessible, engaging experiences.",
});





</script>
