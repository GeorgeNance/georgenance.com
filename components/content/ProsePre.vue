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
			}, 2000);
		})
		.catch((e) => {
			console.error('Error: Unable to copy code.');
		});
}
</script>

<template>
	<!-- Clean wrapper that preserves Shiki highlighting -->
	<div class="my-6 rounded-md overflow-hidden border border-gray-200 relative">
		<!-- Header bar for filename (only show if filename exists) -->
		<div v-if="props.filename" class="flex justify-between items-center px-4 py-2 bg-gray-50 border-b border-gray-200">
			<span class="text-sm text-gray-600 font-mono">{{ filename }}</span>
			<div class="flex items-center gap-2">
				<span v-if="codeCopied" class="text-sm text-green-600">Copied!</span>
				<button 
					@click="copyCode"
					class="text-sm text-gray-500 hover:text-gray-700 transition-colors"
				>
					Copy
				</button>
			</div>
		</div>
		
		<!-- Copy button for blocks without filename -->
		<div v-else class="absolute top-2 right-2 z-10">
			<span v-if="codeCopied" class="text-sm text-green-600 mr-2">Copied!</span>
			<button 
				@click="copyCode"
				class="text-sm text-gray-500 hover:text-gray-700 transition-colors bg-white/80 px-2 py-1 rounded backdrop-blur-sm border border-gray-200"
			>
				Copy
			</button>
		</div>
		
		<!-- Code content - let Shiki handle all the styling -->
		<div class="overflow-x-auto">
			<pre :class="['!my-0', $props.class]" style="font-family: 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace; font-size: 15px; line-height: 1.6;"><slot/></pre>
		</div>
	</div>
</template>

<style scoped>
/* Minimal styles - let Shiki handle colors and backgrounds */
pre {
	margin: 0 !important;
}
</style>