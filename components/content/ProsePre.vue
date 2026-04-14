<script setup lang="ts">
const props = defineProps({
	code: {
		type: String,
		default: ''
	},
	language: {
		type: String,
		default: null
	},
	filename: {
		type: String,
		default: null
	},
	highlights: {
		type: Array as () => number[],
		default: () => []
	},
	meta: {
		type: String,
		default: null
	},
	class: {
		type: String,
		default: null
	}
})

const codeCopied = ref<boolean>(false);

const copyCode = (): void => {
	navigator.clipboard.writeText(props.code)
		.then(() => {
			codeCopied.value = true;
			setTimeout(function () {
				codeCopied.value = false;
			}, 3000);
		})
		.catch((e) => {
			console.error('Error: Unable to copy code.');
		});
}
</script>

<template>
	<div class="group relative rounded-lg border border-warm-200 dark:border-warm-800 overflow-hidden">
		<div class="flex items-center justify-between px-4 py-2 border-b border-warm-200 dark:border-warm-800 bg-warm-850 dark:bg-warm-950/60">
			<span v-if="props.filename" class="font-mono text-xs text-warm-400 truncate">
				{{ filename }}
			</span>
			<span v-else-if="props.language" class="font-mono text-xs text-warm-500 uppercase tracking-wider">
				{{ language }}
			</span>
			<span v-else />
			<button
				class="flex items-center gap-1.5 font-mono text-xs transition-colors duration-200"
				:class="codeCopied ? 'text-green-400' : 'text-warm-500 hover:text-warm-300'"
				@click="copyCode">
				<template v-if="codeCopied">
					<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
					Copied
				</template>
				<template v-else>
					<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
					Copy
				</template>
			</button>
		</div>
		<div class="overflow-x-auto [&>pre]:!bg-transparent">
			<pre :class="['m-0 px-4 py-4 text-sm leading-relaxed', $props.class]"><slot /></pre>
		</div>
	</div>
</template>
