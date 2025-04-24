<template>

  <nav class="flex flex-col lg:fixed lg:h-full justify-center items-center py-4 lg:py-0">
    <div>
      <!-- logo -->
      <div class="flex justify-center lg:justify-start">
        <NuxtLink href="/">
          <span>George Nance</span>
        </NuxtLink>
      </div>
      <!-- mobile menu button -->
      <div>
        <button @click="toggleMobileMenu">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      <div class="flex lg:flex-col gap-4">
        <NuxtLink class=" border-2  ring-2 ring-gray-200 rounded-md -rotate-5 px-2 py-2" :to="item.link"
                  v-for="(item, index) in menuItems" :key="`desktop-${index}`">
          {{ item.label }}
        </NuxtLink>

      </div>
      <!-- <AppThemeToggle /> -->
    </div>
    <!-- mobile nav -->

  </nav>

</template>

<script setup>
import { useFixedHeader } from 'vue-use-fixed-header';
import { ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core';

const headerRef = ref(null);
const { styles } = useFixedHeader(headerRef);
const route = useRoute();

const isDark = useDark();
const toggleDarkMode = useToggle(isDark);

const menuItems = ref([
  { label: 'Home', link: '/', submenu: [], isSubMenuActive: false },
  { label: 'Articles', link: '/articles', submenu: [], isSubMenuActive: false },
  { label: 'Now', link: '/now', submenu: [], isSubMenuActive: false },
  { label: 'About', link: '/about', submenu: [], isSubMenuActive: false },
  // {
  //   label: 'More', link: '', submenu: [
  //     { label: 'Bag', link: '/bag' },
  //   ], isSubMenuActive: false
  // },
]);

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const toggleMobileSubMenu = (index) => {
  menuItems.value[index].isSubMenuActive = !menuItems.value[index].isSubMenuActive;
};

watch(() => route.path, () => {
  isMobileMenuOpen.value = false;
});
</script>

<style scoped>
/* Remove the active-menu-item class since we're handling active states inline */
</style>
