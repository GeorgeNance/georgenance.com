<template>
  <div class="bg-gray-50 border border-border-light rounded-lg p-8 my-section">
    <div class="max-w-md mx-auto text-center">
      <h3 class="text-xl font-bold text-text-primary mb-3">
        Subscribe to George Nance
      </h3>
      <p class="text-text-secondary mb-6 leading-relaxed">
        Get notified when I publish new articles about software development, productivity, and technology.
      </p>
      
      <form @submit.prevent="handleSubscribe" class="space-y-4">
        <input 
          v-model="email"
          type="email" 
          placeholder="Enter your email"
          required
          class="w-full px-4 py-3 border border-border-medium rounded-md text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-text-primary focus:border-transparent"
        />
        <button 
          type="submit"
          :disabled="isSubmitting"
          class="btn-primary w-full"
        >
          {{ isSubmitting ? 'Subscribing...' : 'Subscribe' }}
        </button>
      </form>
      
      <div v-if="message" :class="[
        'mt-4 p-3 rounded',
        messageType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
      ]">
        {{ message }}
      </div>
      
      <p class="text-xs text-text-muted mt-4">
        No spam. Unsubscribe at any time.
      </p>
    </div>
  </div>
</template>

<script setup>
const email = ref('');
const isSubmitting = ref(false);
const message = ref('');
const messageType = ref('');

const handleSubscribe = async () => {
  isSubmitting.value = true;
  message.value = '';
  
  try {
    // For now, just simulate a subscription
    // In a real implementation, you'd integrate with a service like ConvertKit, Mailchimp, etc.
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    message.value = 'Thanks for subscribing! Check your email to confirm.';
    messageType.value = 'success';
    email.value = '';
  } catch (error) {
    message.value = 'Something went wrong. Please try again.';
    messageType.value = 'error';
  } finally {
    isSubmitting.value = false;
  }
};
</script>