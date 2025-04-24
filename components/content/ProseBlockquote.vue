<template>
	<figure class="bg-gray-100 rounded-lg px-6 py-5 shadow-sm my-6">
		<blockquote class="relative">
			<div class="absolute top-0 left-0 text-gray-300 opacity-50 transform -translate-x-4 -translate-y-2">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10">
					<path
						  d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
				</svg>
			</div>
			<div class="text-gray-700 font-medium italic pl-4 pr-2 py-1 border-l-4 border-gray-300">
				<slot />
			</div>
		</blockquote>
		<figcaption v-if="$slots.cite || extractedCitation" class="mt-3 text-right text-sm text-gray-600 font-medium">
			— <cite class="not-italic">
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
	color: #6b7280;
	font-style: normal;
	font-weight: 500;
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