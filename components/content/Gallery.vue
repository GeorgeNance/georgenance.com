<template>
  <figure
    class="photo-gallery not-prose"
    aria-roledescription="carousel"
    :aria-label="caption || 'Photo gallery'"
    @keydown="onKeydown"
  >
    <!-- If the slot could not be parsed (unexpected markup), fall back to rendering it verbatim -->
    <div v-if="!photos.length" class="photo-gallery-fallback">
      <slot />
    </div>

    <template v-else>
      <div
        ref="viewportEl"
        class="photo-gallery-viewport squircle-xl"
        @pointerdown="onPointerDown"
        @pointerup="onPointerUp"
        @pointercancel="resetPointer"
        @pointerleave="resetPointer"
        @scroll.passive="onScroll"
      >
        <div
          v-for="(photo, index) in photos"
          :key="`${photo.src}-${index}`"
          class="photo-gallery-inline-slide"
          role="group"
          aria-roledescription="slide"
          :aria-label="`${index + 1} of ${photos.length}`"
          :aria-hidden="index !== activeIndex ? 'true' : undefined"
        >
          <figure class="photo-gallery-print">
            <button
              type="button"
              class="photo-gallery-item"
              :tabindex="index === activeIndex ? 0 : -1"
              :aria-label="`Enlarge photo ${index + 1} of ${photos.length}${photo.alt ? `: ${photo.alt}` : ''}`"
              @click="onPhotoClick(index)"
            >
              <img
                class="squircle-xl"
                :src="photo.src"
                :alt="photo.alt"
                :width="photo.width"
                :height="photo.height"
                draggable="false"
                loading="lazy"
                decoding="async"
              >
            </button>
            <figcaption v-if="photo.caption" class="photo-gallery-caption">{{ photo.caption }}</figcaption>
          </figure>
        </div>
      </div>

      <div v-if="photos.length > 1" class="photo-gallery-controls">
        <button type="button" class="photo-gallery-arrow" aria-label="Previous photo" @click="prev">
          <Icon name="lucide:chevron-left" aria-hidden="true" />
        </button>
        <div class="photo-gallery-thumbnails" aria-label="Choose a photo">
          <button
            v-for="(photo, index) in photos"
            :key="index"
            type="button"
            class="photo-gallery-thumbnail squircle-md"
            :aria-label="`Show photo ${index + 1} of ${photos.length}`"
            :aria-pressed="index === activeIndex"
            @click="goTo(index)"
          >
            <img :src="photo.src" alt="" draggable="false" loading="lazy" decoding="async">
          </button>
        </div>
        <button type="button" class="photo-gallery-arrow" aria-label="Next photo" @click="next">
          <Icon name="lucide:chevron-right" aria-hidden="true" />
        </button>
      </div>
      <figcaption v-if="caption" class="photo-gallery-shared-caption">{{ caption }}</figcaption>
      <p class="sr-only" aria-live="polite" aria-atomic="true">
        <span v-if="photos.length > 1">{{ activeIndex + 1 }} of {{ photos.length }}</span>
      </p>
    </template>
  </figure>

  <Teleport to="body">
    <dialog
      ref="dialogEl"
      closedby="any"
      class="photo-gallery-dialog"
      aria-label="Photo viewer"
      @close="onDialogClose"
      @keydown="onKeydown"
      @pointerdown="onPointerDown"
      @pointerup="onPointerUp"
      @pointercancel="resetPointer"
    >
      <div class="photo-gallery-stage" @click="onStageClick">
        <div ref="viewerEl" class="photo-gallery-dialog-viewport" @scroll.passive="onScroll">
          <div
            v-for="(photo, index) in photos"
            :key="`slide-${photo.src}-${index}`"
            class="photo-gallery-slide"
            :aria-hidden="index !== activeIndex ? 'true' : undefined"
          >
            <figure class="photo-gallery-print">
              <img
                class="squircle-xl"
                :src="photo.src"
                :alt="photo.alt"
                draggable="false"
                loading="lazy"
                decoding="async"
              >
              <figcaption v-if="photo.caption" class="photo-gallery-caption">{{ photo.caption }}</figcaption>
            </figure>
          </div>
        </div>

        <button
          v-if="photos.length > 1"
          type="button"
          class="photo-gallery-nav is-prev"
          aria-label="Previous photo"
          @click.stop="prev"
        >
          <Icon name="lucide:chevron-left" aria-hidden="true" />
        </button>
        <button
          v-if="photos.length > 1"
          type="button"
          class="photo-gallery-nav is-next"
          aria-label="Next photo"
          @click.stop="next"
        >
          <Icon name="lucide:chevron-right" aria-hidden="true" />
        </button>
        <button type="button" class="photo-gallery-close" aria-label="Close photo viewer" @click.stop="closeLightbox">
          <Icon name="lucide:x" aria-hidden="true" />
        </button>

        <p class="sr-only" aria-live="polite" aria-atomic="true">{{ activeIndex + 1 }} of {{ photos.length }}</p>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
type GalleryPhoto = {
  src: string
  alt: string
  caption: string
  width?: number
  height?: number
}

defineProps({
  /**
   * Optional caption shared by the whole gallery.
   */
  caption: {
    type: String,
    default: '',
  },
})

const slots = useSlots()
const baseURL = useAssetBaseURL()

function toPositiveNumber(value: unknown) {
  const parsed = typeof value === 'number' ? value : Number.parseFloat(String(value ?? ''))
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined
}

/**
 * Walk the slot VNodes and collect the props of every image.
 *
 * Markdown turns `![alt](src "title")` into either a raw `img` element or, in this
 * project, a `ProseImg` component; both are unwrapped from their surrounding `<p>`.
 * Explicit image titles become editorial captions; alt text stays descriptive.
 * Width and height come from `contentAssets.imageSize`.
 */
const photos = computed<GalleryPhoto[]>(() => {
  const collected: GalleryPhoto[] = []

  const addPhoto = (raw: Record<string, unknown> | null | undefined) => {
    const src = typeof raw?.src === 'string' ? refineAssetSrc(raw.src, baseURL) : ''
    if (!src) return
    const width = toPositiveNumber(raw!.width)
    const height = toPositiveNumber(raw!.height)
    const alt = typeof raw!.alt === 'string' ? raw!.alt : ''
    collected.push({
      src,
      alt,
      caption: typeof raw!.title === 'string' ? raw!.title.trim() : '',
      width,
      height,
    })
  }

  const visit = (nodes: unknown) => {
    if (!nodes) return
    const list = Array.isArray(nodes) ? nodes : [nodes]

    for (const node of list) {
      if (!node || typeof node !== 'object') continue
      const vnode = node as Record<string, any>

      // Raw `<img>` element VNode, or a component VNode (e.g. ProseImg) that received image props
      if (vnode.type === 'img' || (vnode.props && typeof vnode.props === 'object' && 'src' in vnode.props)) {
        addPhoto(vnode.props)
        continue
      }

      const children = vnode.children
      if (children && typeof children === 'object' && !Array.isArray(children)) {
        if (typeof children.default === 'function') visit(children.default())
        continue
      }
      if (Array.isArray(children)) visit(children)
    }
  }

  visit(slots.default?.() ?? [])
  return collected
})

/* ------------------------------------------------------------------ */
/* Lightbox                                                            */
/* ------------------------------------------------------------------ */

const dialogEl = ref<HTMLDialogElement | null>(null)
const viewportEl = ref<HTMLElement | null>(null)
const viewerEl = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

function clampIndex(index: number) {
  const count = photos.value.length
  if (!count) return 0
  return ((index % count) + count) % count
}

function openLightbox(index: number) {
  activeIndex.value = clampIndex(index)
  if (dialogEl.value && !dialogEl.value.open) dialogEl.value.showModal()
  alignViewport(viewerEl.value)
}

function closeLightbox() {
  dialogEl.value?.close()
}

function focusActivePhoto() {
  nextTick(() => viewportEl.value?.querySelector<HTMLButtonElement>('.photo-gallery-item[tabindex="0"]')?.focus({ preventScroll: true }))
}

function alignViewport(viewport: HTMLElement | null) {
  if (viewport) viewport.scrollLeft = activeIndex.value * viewport.clientWidth
}

function onDialogClose() {
  alignViewport(viewportEl.value)
  focusActivePhoto()
}

function goTo(index: number) {
  activeIndex.value = clampIndex(index)
  alignViewport(dialogEl.value?.open ? viewerEl.value : viewportEl.value)
}

function onScroll(event: Event) {
  const viewport = event.currentTarget as HTMLElement
  if (!viewport.clientWidth) return
  activeIndex.value = Math.max(0, Math.min(photos.value.length - 1, Math.round(viewport.scrollLeft / viewport.clientWidth)))
}

function next() {
  goTo(activeIndex.value + 1)
}

function prev() {
  goTo(activeIndex.value - 1)
}

/* Both viewers handle keys only while focus is inside them. */
function onKeydown(event: KeyboardEvent) {
  if (event.altKey || event.ctrlKey || event.metaKey) return
  const target = {
    ArrowRight: activeIndex.value + 1,
    ArrowLeft: activeIndex.value - 1,
    Home: 0,
    End: photos.value.length - 1,
  }[event.key]
  if (target === undefined) return
  event.preventDefault()
  goTo(target)
  if ((event.target as HTMLElement | null)?.closest('.photo-gallery-item')) {
    focusActivePhoto()
  }
}

/* Swipe + backdrop dismissal ---------------------------------------- */

let pointerStart: { x: number; y: number } | null = null
let suppressClick = false

function resetPointer() {
  pointerStart = null
}

function onPointerDown(event: PointerEvent) {
  if (!event.isPrimary || event.button !== 0) return
  suppressClick = false
  if ((event.target as HTMLElement | null)?.closest('button:not(.photo-gallery-item)')) {
    resetPointer()
    return
  }
  pointerStart = { x: event.clientX, y: event.clientY }
}

function onPhotoClick(index: number) {
  if (suppressClick) {
    suppressClick = false
    return
  }
  openLightbox(index)
}

function onPointerUp(event: PointerEvent) {
  if (!pointerStart) return
  const deltaX = event.clientX - pointerStart.x
  const deltaY = event.clientY - pointerStart.y
  resetPointer()

  if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) suppressClick = true
  // Touch and trackpad movement scroll the viewport natively, following the fingers.
  // Retain click-and-drag navigation for a mouse without also advancing touch swipes.
  if (event.pointerType !== 'mouse' || Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return

  if (deltaX < 0) next()
  else prev()
}

function onStageClick(event: MouseEvent) {
  if (suppressClick) {
    suppressClick = false
    return
  }
  const target = event.target as HTMLElement | null
  if (target?.closest('img, button, .photo-gallery-caption')) return
  closeLightbox()
}
</script>

<style scoped>
.photo-gallery {
  --gallery-height: clamp(22rem, 66svh, 38rem);
  --gallery-inset: clamp(0.75rem, 2vw, 1.5rem);
  --gallery-surface: var(--color-warm-100);
  --gallery-control: var(--color-warm-200);
  --gallery-ink: var(--color-warm-800);
  --gallery-muted: var(--color-warm-600);
  margin: 3rem 0;
}

.dark-mode .photo-gallery {
  --gallery-surface: var(--color-warm-900);
  --gallery-control: var(--color-warm-800);
  --gallery-ink: var(--color-warm-50);
  --gallery-muted: var(--color-warm-400);
}

.photo-gallery-viewport,
.photo-gallery-dialog-viewport {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
}

.photo-gallery-viewport::-webkit-scrollbar,
.photo-gallery-dialog-viewport::-webkit-scrollbar {
  display: none;
}

.photo-gallery-viewport {
  background: var(--gallery-surface);
}

.photo-gallery-inline-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 100%;
  min-width: 0;
  height: var(--gallery-height);
  padding: var(--gallery-inset);
  scroll-snap-align: start;
}

.photo-gallery-print {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  max-width: 100%;
  margin: 0;
}

.photo-gallery-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  cursor: zoom-in;
}

.photo-gallery-item img {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: calc(var(--gallery-height) - var(--gallery-inset) * 2 - 4rem);
  object-fit: contain;
  user-select: none;
}

.photo-gallery-item:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: -4px;
}

.photo-gallery-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.5rem, 2vw, 1.5rem);
  margin-top: 1.25rem;
}

.photo-gallery-thumbnails {
  display: flex;
  align-items: center;
  gap: clamp(0.25rem, 1vw, 0.75rem);
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;
  padding-block: 0.4rem;
}

.photo-gallery-thumbnails::-webkit-scrollbar {
  display: none;
}

.photo-gallery-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 2.75rem;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--gallery-control);
  color: var(--gallery-ink);
  font-size: 1.25rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.photo-gallery-arrow:hover {
  transform: scale(1.08);
}

.photo-gallery-arrow:active {
  transform: scale(0.94);
}

.photo-gallery-thumbnail {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: clamp(2.75rem, 5vw, 3.5rem);
  height: clamp(3.25rem, 6vw, 4.25rem);
  padding: 0;
  border: 0;
  background: var(--gallery-surface);
  opacity: 0.45;
  transform: translateY(3px);
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.photo-gallery-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
  border-radius: inherit;
  corner-shape: inherit;
}

.photo-gallery-thumbnail:hover,
.photo-gallery-thumbnail[aria-pressed="true"] {
  opacity: 1;
  transform: translateY(0);
}

.photo-gallery-arrow:focus-visible,
.photo-gallery-thumbnail:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
  opacity: 1;
}

.photo-gallery-shared-caption {
  margin: 0.75rem 0 0;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: center;
  color: var(--gallery-muted);
}

.photo-gallery-caption {
  margin: 0;
  max-width: 60ch;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: center;
  overflow-wrap: anywhere;
  color: var(--gallery-ink);
}

@media (min-width: 1024px) {
  .photo-gallery {
    margin-inline: -4rem;
  }
}

@media (max-width: 639px) {
  .photo-gallery {
    --gallery-height: clamp(22rem, 64svh, 34rem);
  }

  .photo-gallery-controls {
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
}

/* Lightbox ----------------------------------------------------------- */

/* Lock page scroll while any gallery lightbox is open */
:global(html:has(.photo-gallery-dialog[open])) {
  overflow: hidden;
}

.photo-gallery-dialog {
  --gallery-ink: var(--color-warm-200);
  width: 100vw;
  max-width: 100vw;
  height: 100dvh;
  max-height: 100dvh;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  overflow: hidden;
  color: var(--color-warm-50);
  overscroll-behavior: contain;
}

.photo-gallery-dialog::backdrop {
  background: var(--color-warm-950);
  overscroll-behavior: contain;
}

.photo-gallery-stage {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.photo-gallery-dialog-viewport {
  width: 100%;
  height: 100%;
}

.photo-gallery-slide {
  display: flex;
  flex: 0 0 100%;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: 100%;
  padding: 4rem 1rem;
  scroll-snap-align: start;
}

.photo-gallery-slide img {
  max-width: 100%;
  max-height: calc(100dvh - 12rem);
  width: auto;
  height: auto;
  object-fit: contain;
}

.photo-gallery-nav,
.photo-gallery-close {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 2.75rem;
  height: 2.75rem;
  border: 0;
  border-radius: 999px;
  background: var(--color-warm-800);
  color: var(--color-warm-50);
  font-size: 1.25rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.photo-gallery-nav:hover,
.photo-gallery-close:hover {
  background: var(--color-warm-700);
}

.photo-gallery-nav {
  top: 50%;
  transform: translateY(-50%);
}

.photo-gallery-nav.is-prev {
  left: 0.75rem;
}

.photo-gallery-nav.is-next {
  right: 0.75rem;
}

.photo-gallery-close {
  top: 0.75rem;
  right: 0.75rem;
}

@media (max-width: 639px) {
  .photo-gallery-nav {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .photo-gallery-arrow,
  .photo-gallery-thumbnail,
  .photo-gallery-nav,
  .photo-gallery-close {
    transition: none;
  }
}
</style>
