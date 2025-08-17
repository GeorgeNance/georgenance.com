<template>
  <div ref="headerRef" :style="styles"
       class="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border-light z-50">
    <nav class="max-w-reading mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo/Name -->
        <div class="flex-shrink-0">
          <NuxtLink href="/"
                    class="text-xl font-semibold text-text-primary hover:opacity-80 transition-opacity">
            George Nance
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/articles"
                    class="text-text-secondary hover:opacity-80 transition-opacity"
                    :class="{ 'text-text-primary': route.path.startsWith('/articles') }">
            Articles
          </NuxtLink>
          <NuxtLink to="/about"
                    class="text-text-secondary hover:opacity-80 transition-opacity"
                    :class="{ 'text-text-primary': route.path === '/about' }">
            About
          </NuxtLink>
          <NuxtLink to="/now"
                    class="text-text-secondary hover:opacity-80 transition-opacity"
                    :class="{ 'text-text-primary': route.path === '/now' }">
            Now
          </NuxtLink>
          <button class="btn-primary">
            Subscribe
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="toggleMobileMenu"
                  class="p-2 text-text-secondary hover:opacity-80 transition-opacity">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-2 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-2 opacity-0">
        <div v-show="isMobileMenuOpen" class="md:hidden pt-4 border-t border-border-light mt-4">
          <div class="space-y-3">
            <NuxtLink to="/articles"
                      @click="closeMobileMenu"
                      class="block py-2 text-text-secondary hover:opacity-80 transition-opacity"
                      :class="{ 'text-text-primary': route.path.startsWith('/articles') }">
              Articles
            </NuxtLink>
            <NuxtLink to="/about"
                      @click="closeMobileMenu"
                      class="block py-2 text-text-secondary hover:opacity-80 transition-opacity"
                      :class="{ 'text-text-primary': route.path === '/about' }">
              About
            </NuxtLink>
            <NuxtLink to="/now"
                      @click="closeMobileMenu"
                      class="block py-2 text-text-secondary hover:opacity-80 transition-opacity"
                      :class="{ 'text-text-primary': route.path === '/now' }">
              Now
            </NuxtLink>
            <button class="btn-primary w-full mt-4">
              Subscribe
            </button>
          </div>
        </div>
      </Transition>
    </nav>
  </div>
</template>

<script setup>
import { useFixedHeader } from 'vue-use-fixed-header';

const headerRef = ref(null);
const { styles } = useFixedHeader(headerRef);
const route = useRoute();

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Close mobile menu when route changes
watch(() => route.path, () => {
  closeMobileMenu();
});
</script>