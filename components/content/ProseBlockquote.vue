<template>
	<figure class="not-prose my-10">
		<blockquote
					class="relative p-8 bg-paper-100 border-l-4 border-forest-600 rounded-xl shadow-paper border border-outline-100">
			<div class="absolute -left-2 top-4 w-8 h-8 text-forest-600">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
					<path
						  d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
				</svg>
			</div>
			<div class="relative z-10 text-lg md:text-xl font-serif leading-relaxed text-ink-300 italic pl-6">
				<slot />
			</div>
			<div class="hidden">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
					<path
						  d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
				</svg>
			</div>
		</blockquote>
		<figcaption v-if="$slots.cite || extractedCitation"
					class="mt-3 text-right text-sm text-ink-200 font-medium pr-4">
			— <cite class="not-italic text-ink-300 font-semibold">
				<slot v-if="$slots.cite" name="cite" />
				<span v-else>{{ extractedCitation }}</span>
			</cite>
		</figcaption>
	</figure>
</template>

<style>
/* Style for native cite elements inside blockquotes */
blockquote+cite,
blockquote cite {
	display: block;
	margin-top: 0.75rem;
	text-align: right;
	font-size: 0.875rem;
	color: #333333; /* ink-200 */
	font-style: normal;
	font-weight: 500;
	padding-right: 1rem;
}

blockquote+cite::before,
blockquote cite::before {
	content: "— ";
}
</style>

<script lang="ts" setup>
import { defineComponent, ref, onMounted, useSlots } from 'vue';

const slots = useSlots();
const extractedCitation = ref('');

// Function to extract citation from the default slot content
onMounted(() => {
	if (slots.default) {
		const slotContent = slots.default();
		if (slotContent && slotContent.length > 0) {
			// Convert slot content to string to search for <cite> tags
			const contentString = slotContent
				.map(node => {
					if (typeof node.children === 'string') return node.children;
					if (node.type === 'text') return node.children;
					return '';
				})
				.join('');

			// Look for <cite> tags in the content
			const citeRegex = /<cite>(.*?)<\/cite>/;
			const match = contentString.match(citeRegex);

			if (match && match[1]) {
				extractedCitation.value = match[1].trim();
			}
		}
	}
});

// Define the component for proper registration with Nuxt Content
defineComponent({
	name: 'ProseBlockquote'
});
</script>