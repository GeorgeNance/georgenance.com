<template>
	<aside class="my-4 px-4 py-3 rounded-md shadow-xs relative overflow-hidden border border-transparent dark:border-opacity-10"
		   :class="typeClass.bg">
		<span class="w-1.5 h-full absolute bottom-0 left-0 top-0" :class="typeClass.side">
		</span>
		<p class="text-xl font-medium ml-4 mb-1 text-warm-800 dark:text-warm-100" v-if="title != ''">{{ title }}</p>
		<div class="ml-4 prose dark:prose-invert max-w-none">
			<slot></slot>
		</div>
	</aside>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	title: {
		type: String,
		required: false,
		default: "",
	},
	type: {
		type: String,
		required: false,
		default: "info",
		options: ["info", "warning", "danger", "success"],
	},
});

const typeClasses = {
	info: {
		bg: "bg-blue-50/80 dark:bg-blue-900/15 outline-blue-300 dark:outline-blue-700",
		side: "bg-secondary",
	},
	warning: {
		bg: "bg-warm-100/90 dark:bg-warm-850/50 outline-warm-300 dark:outline-warm-700",
		side: "bg-primary",
	},
	danger: {
		bg: "bg-red-50/80 dark:bg-red-900/15 outline-red-300 dark:outline-red-600",
		side: "bg-red-400 dark:bg-red-500",
	},
	success: {
		bg: "bg-emerald-50/80 dark:bg-emerald-900/15 outline-emerald-300 dark:outline-emerald-600",
		side: "bg-emerald-400 dark:bg-emerald-500",
	},
};

const typeClass = computed(() => {
	return typeClasses[props.type];
});
</script>
