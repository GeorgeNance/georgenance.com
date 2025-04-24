<template>
  <!-- <img :src="refinedSrc" :alt="alt" :width="width" :height="height"> -->
  <div>
    <NuxtImg :src="src" :alt="alt" @click.stop="() => (showLightbox = !showLightbox)" width="800"
             sizes="sm:600px md:800px" placeholder densities="x1 x2" />
  </div>
  <Teleport to="body">
    <Transition enter-from- leave-to->
      <div v-if="showLightbox" class="z-10 fixed bottom-0 right-0 top-0 left-0
               bg-black bg-opacity-50 flex items-center
               justify-center backdrop-blur-xs transition-all
               duration-300 md:p-8 w-full h-full" @click.stop="() => (showLightbox = !showLightbox)">
        <NuxtImg :src="src" :alt="alt" width="100%" height="auto" sizes="sm:600px md:800px lg:1600px xl:6000px"
                 densities="x1 x2" />
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