<template>
	<main>
		<AppHeader :title="`${title} articles`" :description="description" />
		<ul>
			<li v-for="(article, id) in articles" :key="id">
				<AppArticleCard :article="article" :delay-animation="id * 100" />
			</li>
		</ul>
	</main>
</template>

<script setup>
const fallbackDescription =
	"All of my long-form thoughts on programming, user interfaces, product design, and more, collected in chronological order.";


// Get Tag from route
const slug = useRoute().params.slug

// Grab the article from the content module
const tag = await queryCollection('tag')
	.where('slug', '=', slug)
	.first()

let title = tag?.title || slug.charAt(0).toUpperCase() + slug.slice(1)
let description = tag?.description || fallbackDescription

useSeoMeta({
	title: title,
	description: description,
});

const { data: articles } = await useAsyncData(`${slug}-articles`, () =>
	queryCollection("article")
		.where('tags', 'LIKE', `%${slug}%`)
		.order('date', 'DESC')
		.where('published', '=', true)
		.all()
);
</script>