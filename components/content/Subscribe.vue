<template>
  <div>
    <div>
      <div>
        <div>
          <!-- Header -->
          <div>
            <slot>
              <h2>
                Stay Updated
              </h2>
              <p>
                Get the latest articles and resources delivered straight to your inbox.
              </p>
            </slot>
          </div>

          <!-- Form -->
          <form action="https://app.kit.com/forms/1487497/subscriptions" method="post" data-sv-form="1487497"
                data-uid="4830af25d2" data-format="inline" data-version="5"
                data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! ✅\n\nNow please check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'>
            <div>
              <!-- Error messages -->
              <ul data-element="errors" data-group="alert"></ul>

              <div>
                <!-- First Name Field -->
                <div>
                  <input aria-label="Your first name" name="fields[first_name]" placeholder="Your first name"
                         type="text">
                </div>

                <!-- Email Field -->
                <div>
                  <input name="email_address" aria-label="Your email address" placeholder="Your email address" required
                         type="email">
                </div>
              </div>

              <!-- Submit Button -->
              <button data-element="submit">
                <div>
                  <div></div>
                  <div></div>
                  <div></div>
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

// Load ConvertKit script on mount
onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://f.convertkit.com/ckjs/ck.5.js';
  script.async = true;
  document.head.appendChild(script);
});


</script>

<style>
/* Full-width container that breaks out of parent */
.full-width-container {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

@keyframes bounce {

  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}
</style>