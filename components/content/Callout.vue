<template>
	<aside :class="typeClass.bg">
		<span :class="typeClass.side">
		</span>
		<p v-if="title != ''">{{ title }}</p>
		<div>
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

// Computed classes based on the type prop
const typeClasses = {
	info: {
		bg: "bg-blue-50/80 dark:bg-blue-900/15 outline-blue-300 dark:outline-blue-700",
		side: "bg-secondary",
	},
	warning: {
		bg: "bg-orange-50/90 dark:bg-amber-900/15 outline-orange-300 dark:outline-amber-600",
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
