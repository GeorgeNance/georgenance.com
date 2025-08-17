<template>
	<main class="min-h-screen">
		<AppHeader class="mb-12" title="Tags" :description="description" />
		<div class="space-y-4">
			<ul v-for="(tag, tagCount) in tagCount">
				<li>
					<NuxtLink :to="`/tags/${tag.tag}`"
							  class="text-2xl font-bold text-ink-400 hover:text-forest-800">
						{{ tag.tag }}
					</NuxtLink>
					<span class=" ml-2 text-ink-200">({{ tag.count }})</span>
				</li>

			</ul>
		</div>
	</main>
</template>

<script setup>
const description =
	"Tags for all of my articles. Here's a list of all the tags I've used.";
useSeoMeta({
	title: "Tags",
	description,
});

const { data: articles } = await useAsyncData("all-articles", () => {
	let query = queryCollection("article");

	// Only filter by published in production
	if (!import.meta.dev) {
		query = query.where("published", "=", true);
	}

	return query.all();
});


// Get Tags - only proceed if we have articles
const tags = articles.value?.map((article) => article.tags)
	.flat()
	.filter((tag, index, self) => self.indexOf(tag) === index)
	.filter((tag) => tag !== undefined)
	.sort() || [];

// Get Count of articles for each tag
const tagCount = tags.map((tag) => {
	const count = articles.value?.filter((article) => article.tags.includes(tag)).length || 0;
	return { tag, count };
});

</script>
