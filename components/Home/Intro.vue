<template>
  <section>
    <div class="flex items-center gap-5 mb-8 animate-fade-up stagger-1">
      <img src="/img/profile.jpg" alt="George Nance" draggable="false"
           class="rounded-full h-16 w-16 md:h-20 md:w-20 ring-2 ring-warm-200 dark:ring-warm-800 bg-warm-100 dark:bg-warm-900 shrink-0 object-cover"
           width="80" height="80" loading="eager" decoding="async">
      <div>
        <h1 class="text-2xl md:text-3xl font-serif font-bold tracking-tight text-warm-800 dark:text-warm-50">
          George Nance
        </h1>
        <p class="text-sm text-warm-500 dark:text-warm-400 mt-0.5">
          Full Stack Developer · Phoenix, AZ
        </p>
      </div>
    </div>

    <div class="space-y-4 text-base leading-relaxed animate-fade-up stagger-2">
      <p>
        I build things for the web and occasionally write about the process.
        Passionate about technology, open source, and all things nerdy.
      </p>
      <p>
        See what I'm
        <NuxtLink to="/now" class="text-primary hover:text-primary-100 underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors">working on now</NuxtLink>,
        or learn a bit more
        <NuxtLink to="/about" class="text-primary hover:text-primary-100 underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors">about me</NuxtLink>.
      </p>
    </div>
  </section>
</template>

<script setup>
useSeoMeta({
  title: "Home",
  description:
    "I'm George Nance, a Full Stack Web Developer from the sunny landscapes of Phoenix, Arizona. My passion lies in leveraging the latest technologies to craft accessible, engaging experiences.",
});
</script>
