<template>
	<div v-if="page" class="mb-32">
		<main class="min-h-screen max-w-reading mx-auto px-6 py-16">
			<div class="w-full">
				<article class="w-full">
					<!-- Page header with title and date -->
					<header class="mb-12">
						<h1 class="text-article-xl font-bold text-text-primary mb-4 leading-tight">
							{{ page.title }}
						</h1>
						<div v-if="page.updated_at" class="text-meta text-text-tertiary">
							Last updated: {{ getReadableDate(page.updated_at) }}
						</div>
					</header>

					<!-- Page content -->
					<div class="prose max-w-none">
						<ContentRenderer :value="page" />
					</div>
				</article>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">


const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection('page').path(route.path).first()
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
