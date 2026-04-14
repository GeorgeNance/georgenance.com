<template>
  <div ref="headerRef" :style="styles"
       class="bg-warm-50/90 dark:bg-warm-950/85 fixed top-0 w-full z-50 backdrop-blur-md">
    <nav class="border-b border-warm-200/80 dark:border-warm-800/40">
      <div class="max-w-3xl mx-auto px-6">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <NuxtLink href="/"
                    class="py-5 font-serif text-lg font-bold text-warm-900 dark:text-warm-50 hover:text-primary transition-colors">
            George Nance
          </NuxtLink>

          <!-- Mobile menu button -->
          <button @click="toggleMobileMenu"
                  class="md:hidden outline-hidden text-warm-500 dark:text-warm-400 hover:text-warm-800 dark:hover:text-warm-100 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16m-7 6h7" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Desktop nav -->
          <div class="hidden md:flex items-center gap-1">
            <NuxtLink v-for="item in navLinks" :key="item.link" :to="item.link"
                      class="py-5 px-3 text-sm font-medium transition-colors"
                      :class="isActive(item.link)
                        ? 'text-primary'
                        : 'text-warm-500 dark:text-warm-400 hover:text-warm-800 dark:hover:text-warm-100'">
              {{ item.label }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Mobile nav -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1">
        <div v-if="isMobileMenuOpen"
             class="md:hidden border-t border-warm-200/80 dark:border-warm-800/40 pb-3">
          <NuxtLink v-for="item in navLinks" :key="item.link" :to="item.link"
                    class="block py-2.5 px-6 text-sm font-medium transition-colors"
                    :class="isActive(item.link)
                      ? 'text-primary'
                      : 'text-warm-500 dark:text-warm-400'">
            {{ item.label }}
          </NuxtLink>
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

const navLinks = [
  { label: 'Articles', link: '/articles' },
  { label: 'Now', link: '/now' },
  { label: 'About', link: '/about' },
  { label: 'Bag', link: '/bag' },
];

const isActive = (link) => route.path === link;

const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

watch(() => route.path, () => {
  isMobileMenuOpen.value = false;
});
</script>
