/**
 * A stable key for content queries on routable pages.
 *
 * Cloudflare Pages serves prerendered routes with a trailing slash (`/about/`), while
 * the prerendered payload is keyed without one (`/about`). Using `route.path` directly
 * as a `useAsyncData` key therefore misses the payload on hydration and re-runs the
 * query in the browser, which lazily downloads the ~400 KiB sqlite3 WASM bundle plus
 * the collection SQL dump to fetch content that is already in the payload.
 */
export function useContentRouteKey() {
  const route = useRoute();
  return computed(() => route.path.replace(/\/+$/, '') || '/');
}
