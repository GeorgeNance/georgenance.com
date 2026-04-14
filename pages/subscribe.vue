<template>
  <main class="min-h-screen py-12 sm:py-16 lg:py-20">
    <div class="max-w-lg mx-auto">
      <!-- Header -->
      <div class="text-center animate-fade-up stagger-1">
        <div class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-warm-400 dark:text-warm-500 mb-6">
          <span class="h-px w-6 bg-warm-300 dark:bg-warm-700"></span>
          Newsletter
          <span class="h-px w-6 bg-warm-300 dark:bg-warm-700"></span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-serif font-bold text-warm-800 dark:text-warm-50 leading-tight">
          Stay in the loop
        </h1>
        <p class="mt-4 text-base text-warm-500 dark:text-warm-400 leading-relaxed max-w-md mx-auto">
          Occasional dispatches on software, side projects, and whatever else I find interesting. No spam, unsubscribe anytime.
        </p>
      </div>

      <!-- Form -->
      <div class="mt-10 animate-fade-up stagger-2">
        <form
          action="https://app.kit.com/forms/1487497/subscriptions"
          class="seva-form formkit-form"
          method="post"
          data-sv-form="1487497"
          data-uid="4830af25d2"
          data-format="inline"
          data-version="5"
        >
          <ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>

          <div class="space-y-3">
            <div class="formkit-field">
              <input
                class="w-full px-4 py-3 rounded-lg border bg-warm-50 dark:bg-warm-900 border-warm-200 dark:border-warm-800 text-warm-800 dark:text-warm-100 placeholder-warm-400 dark:placeholder-warm-600 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 font-sans text-sm"
                aria-label="Your first name"
                name="fields[first_name]"
                placeholder="First name"
                type="text"
              />
            </div>
            <div class="formkit-field">
              <input
                class="w-full px-4 py-3 rounded-lg border bg-warm-50 dark:bg-warm-900 border-warm-200 dark:border-warm-800 text-warm-800 dark:text-warm-100 placeholder-warm-400 dark:placeholder-warm-600 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 font-sans text-sm"
                name="email_address"
                aria-label="Your email address"
                placeholder="Email address"
                required
                type="email"
              />
            </div>
            <button
              data-element="submit"
              class="formkit-submit cursor-pointer w-full py-3 px-6 rounded-lg font-medium text-warm-50 bg-primary hover:bg-primary-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-warm-50 dark:focus:ring-offset-warm-950 text-sm tracking-wide"
            >
              <div class="formkit-spinner inline-flex items-center mr-2 opacity-0 transition-opacity duration-300 group-data-[active]:opacity-100">
                <div class="w-1.5 h-1.5 mx-0.5 bg-current rounded-full animate-pulse"></div>
                <div class="w-1.5 h-1.5 mx-0.5 bg-current rounded-full animate-pulse [animation-delay:150ms]"></div>
                <div class="w-1.5 h-1.5 mx-0.5 bg-current rounded-full animate-pulse [animation-delay:300ms]"></div>
              </div>
              <span>Subscribe</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Divider -->
      <div class="mt-12 mb-10 h-px bg-warm-200 dark:bg-warm-800 animate-fade-up stagger-3"></div>

      <!-- What to expect -->
      <div class="animate-fade-up stagger-3 text-center">
        <p class="text-sm text-warm-400 dark:text-warm-500 leading-relaxed">
          You'll hear about new articles, things I'm building, and the occasional recommendation. Sent at most a few times a month.
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue';

useSeoMeta({
  title: "Subscribe",
  description: "Get occasional updates on new articles, projects, and interesting finds from George Nance.",
});

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://f.convertkit.com/ckjs/ck.5.js';
  script.async = true;
  document.head.appendChild(script);
});
</script>
