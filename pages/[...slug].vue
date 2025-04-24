<template>
	<div v-if="page">
		<main>
			<div>
				<div>
					<div>
						<article>
							<!-- Page header with title and date -->
							<header>
								<h1>
									{{ page.title }}
								</h1>
								<div v-if="page.updated_at">
									Last updated: {{ getReadableDate(page.updated_at) }}
								</div>
							</header>
						</article>
					</div>

					<!-- Page content -->
					<div>
						<ContentRenderer :value="page" />
					</div>
				</div>
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
