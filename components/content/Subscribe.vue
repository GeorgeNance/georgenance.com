<template>
  <div class="md:py-12 full-width-container bg-warm-100 dark:bg-warm-900 inset-shadow-sm ">
    <div class="max-w-3xl mx-auto ">
      <div
           class="rounded-lg overflow-hidden shadow-sm border border-warm-200 dark:border-warm-800 bg-warm-50 dark:bg-warm-900">
        <div class="p-6 md:p-8">
          <!-- Header -->
          <div class="text-center mb-6">
            <slot>
              <h2 class="text-2xl font-bold mb-2 text-warm-800 dark:text-warm-50 font-serif">
                Stay Updated
              </h2>
              <p class="text-warm-500 dark:text-warm-400">
                Get the latest articles and resources delivered straight to your inbox.
              </p>
            </slot>
          </div>

          <!-- Form -->
          <form action="https://app.kit.com/forms/1487497/subscriptions" class="seva-form formkit-form" method="post"
                data-sv-form="1487497" data-uid="4830af25d2" data-format="inline" data-version="5"
                data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! ✅\n\nNow please check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'>
            <div class="space-y-4">
              <!-- Error messages -->
              <ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- First Name Field -->
                <div class="formkit-field">
                  <input class="w-full px-4 py-3 rounded-lg border focus:ring-2 transition-all duration-200 outline-none bg-warm-50 dark:bg-warm-850 border-warm-200 dark:border-warm-700 text-warm-800 dark:text-warm-100 placeholder-warm-400 dark:placeholder-warm-600 focus:ring-primary/40 focus:border-primary"
                         aria-label="Your first name" name="fields[first_name]" placeholder="Your first name"
                         type="text">
                </div>

                <!-- Email Field -->
                <div class="formkit-field">
                  <input class="w-full px-4 py-3 rounded-lg border focus:ring-2 transition-all duration-200 outline-none bg-warm-50 dark:bg-warm-850 border-warm-200 dark:border-warm-700 text-warm-800 dark:text-warm-100 placeholder-warm-400 dark:placeholder-warm-600 focus:ring-primary/40 focus:border-primary"
                         name="email_address" aria-label="Your email address" placeholder="Your email address" required
                         type="email">
                </div>
              </div>

              <!-- Submit Button -->
              <button data-element="submit"
                      class="formkit-submit cursor-pointer w-full py-3 px-6 rounded-lg font-medium text-warm-50 bg-primary hover:bg-primary-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 relative group">
                <div
                     class="formkit-spinner inline-flex items-center mr-2 opacity-0 transition-opacity duration-300 group-data-[active]:opacity-100">
                  <div class="w-2 h-2 mx-0.5 bg-current rounded-full animate-pulse"></div>
                  <div class="w-2 h-2 mx-0.5 bg-current rounded-full animate-pulse [animation-delay:150ms]"></div>
                  <div class="w-2 h-2 mx-0.5 bg-current rounded-full animate-pulse [animation-delay:300ms]"></div>
                </div>
                <span>Subscribe Now</span>
              </button>


            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  if (!document.querySelector('script[src*="convertkit"]')) {
    const script = document.createElement('script');
    script.src = 'https://f.convertkit.com/ckjs/ck.5.js';
    script.async = true;
    document.head.appendChild(script);
  }
});
</script>

<style>
.full-width-container {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
</style>
