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
			}, 5000);
		})
		.catch((e) => {
			console.error('Error: Unable to copy code.');
		});
}
</script>

<template>
	<div>
		<div>
			<div v-if="props.filename">
				<i>{{ filename }}</i>
			</div>
			<span v-if="codeCopied">
				<i>Copied</i>
			</span>
			<button @click="copyCode">
				Copy
			</button>
		</div>
		<div>
			<pre class="code-block">
				<div class="code-content"><slot/></div></pre>
		</div>
	</div>
</template>
