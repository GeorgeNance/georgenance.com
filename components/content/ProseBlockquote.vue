<template>
	<figure class="not-prose my-10">
		<blockquote
					class="relative p-8 bg-warm-100/70 dark:bg-warm-850/50 rounded-lg text-warm-800 dark:text-warm-200 shadow-xs border border-warm-200/50 dark:border-warm-800/30">
			<div class="absolute -left-4 top-2 w-10 h-10 text-primary">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
					<path
						  d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
				</svg>
			</div>
			<div class="relative z-10 text-lg md:text-xl font-serif leading-relaxed px-5 py-2">
				<slot />
			</div>
			<div class="absolute -right-4 -bottom-2 w-10 h-10 text-primary transform rotate-180">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
					<path
						  d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
				</svg>
			</div>
		</blockquote>
		<figcaption v-if="$slots.cite || extractedCitation"
					class="mt-3 text-right text-sm text-warm-500 dark:text-warm-400 font-medium pr-4">
			— <cite class="not-italic">
				<slot v-if="$slots.cite" name="cite" />
				<span v-else>{{ extractedCitation }}</span>
			</cite>
		</figcaption>
	</figure>
</template>

<style>
blockquote+cite,
blockquote cite {
	display: block;
	margin-top: 0.75rem;
	text-align: right;
	font-size: 0.875rem;
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

onMounted(() => {
	if (slots.default) {
		const slotContent = slots.default();
		if (slotContent && slotContent.length > 0) {
			const contentString = slotContent
				.map(node => {
					if (typeof node.children === 'string') return node.children;
					if (node.type === 'text') return node.children;
					return '';
				})
				.join('');

			const citeRegex = /<cite>(.*?)<\/cite>/;
			const match = contentString.match(citeRegex);

			if (match && match[1]) {
				extractedCitation.value = match[1].trim();
			}
		}
	}
});

defineComponent({
	name: 'ProseBlockquote'
});
</script>
