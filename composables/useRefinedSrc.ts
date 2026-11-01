import { withBase } from 'ufo'
import type { MaybeRefOrGetter } from 'vue'

/**
 * The app's base URL. Content assets are written as root-relative paths (`/articles/...`),
 * so when the site is deployed under a sub-path they need to be prefixed before they resolve.
 */
export function useAssetBaseURL() {
  return useRuntimeConfig().app.baseURL || '/'
}

/** Prefix a root-relative asset path with the base URL; leaves `//host` and absolute URLs alone. */
export function refineAssetSrc(src: string | null | undefined, baseURL: string) {
  if (!src || !src.startsWith('/') || src.startsWith('//')) return src || ''
  return withBase(src, baseURL)
}

/** Reactive `refineAssetSrc` for a single image path. */
export function useRefinedSrc(src: MaybeRefOrGetter<string | null | undefined>) {
  const baseURL = useAssetBaseURL()
  return computed(() => refineAssetSrc(toValue(src), baseURL))
}
