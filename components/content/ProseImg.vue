<template>
  <div class="p-2 md:-mx-8 lg:-mx-16">
    <img
      class="w-full cursor-pointer rounded-xl shadow-lg"
      :src="refinedSrc"
      :alt="alt"
      :width="width"
      :height="height"
      loading="lazy"
      decoding="async"
      @click.stop="() => (showLightbox = !showLightbox)"
    >
  </div>
  <Teleport to="body">
    <Transition enter-from-class="opacity-0" leave-to-class="opacity-0">
      <div
        v-if="showLightbox"
        class="fixed inset-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-xs transition-all duration-300 md:p-8"
        @click.stop="() => (showLightbox = !showLightbox)"
      >
        <img
          class="max-h-full max-w-full object-contain"
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
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'
import { useRuntimeConfig, computed } from '#imports'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
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

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
    if (_base !== '/' && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src)
    }
  }
  return props.src
})

const showLightbox = ref(false);
</script>
