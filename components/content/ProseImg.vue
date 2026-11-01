<template>
  <div class="p-2 md:-mx-8 lg:-mx-16">
    <img
      class="w-full cursor-pointer squircle-xl shadow-lg"
      :src="refinedSrc"
      :alt="alt"
      :title="title || undefined"
      :width="width"
      :height="height"
      loading="lazy"
      decoding="async"
      @click.stop="() => (showLightbox = !showLightbox)"
    >
    <span v-if="title" class="mt-2 block text-center font-sans text-sm text-warm-500 dark:text-warm-400">
      {{ title }}
    </span>
  </div>
  <Teleport to="body">
    <Transition enter-from-class="opacity-0" leave-to-class="opacity-0">
      <div
        v-if="showLightbox"
        class="fixed inset-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-xs transition-all duration-300 md:p-8"
        @click.stop="() => (showLightbox = !showLightbox)"
      >
        <img
          class="max-h-full max-w-full object-contain squircle-xl"
          :src="refinedSrc"
          :alt="alt"
          loading="lazy"
          decoding="async"
        >
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useRefinedSrc } from '~/composables/useRefinedSrc'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: '100%'
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})

const refinedSrc = useRefinedSrc(() => props.src)

const showLightbox = ref(false);
</script>
