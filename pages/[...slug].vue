<template>
	<div v-if="page" class="mb-32">
		<main class="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
			<div class="relative flex items-start">
				<div class="grow">
					<div class="max-w-3xl mx-auto">
						<article class="w-full">
							<!-- Page header with title and date -->
							<header class="mb-12">
								<h1
									class="text-4xl sm:text-5xl dark:text-white font-h1 font-bold mb-4 mt-0 leading-tight">
									{{ page.title }}
								</h1>
								<div v-if="page.updated_at" class="text-gray-600 dark:text-gray-400 text-base">
									Last updated: {{ getReadableDate(page.updated_at) }}
								</div>
							</header>
						</article>
					</div>

					<!-- Page content -->
					<div class="max-w-3xl mx-auto w-full">
						<ContentRenderer :value="page"
										 class="page-content prose prose-lg dark:prose-invert prose-headings:scroll-mt-24 prose-blockquote:not-italic prose-pre:bg-gray-900 prose-img:ring-1 prose-img:ring-gray-200 dark:prose-img:ring-white/10 prose-img:squircle-xl mx-auto" />
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">


// Cloudflare Pages serves these routes with a trailing slash, but the prerendered
// payload is keyed without one. Normalizing keeps the payload in use so the client
// never has to fall back to a client-side SQLite query (which pulls in the 400 KiB
// sqlite3 WASM bundle) just to re-fetch content that is already in the payload.
const contentKey = useContentRouteKey()

const { data: page } = await useAsyncData(contentKey.value, () => {
	return queryCollection('page').path(contentKey.value).first()
})

// Handle 404 if page not found
if (!page.value) {
	throw createError({
		statusCode: 404,
		message: 'Page not found'
	})
}

// Set meta tags if we have page data
if (page.value) {
	useSeoMeta({
		title: page.value.title,
		description: page.value.description || '',
	})
}

const getReadableDate = (dateString: string): string => {
	const date = new Date(dateString)
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	})
}
</script>

<style></style>
