<template>
	<div>{{ userStore.user }}</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'profile',
	middleware: 'auth-middleware',
});

const userStore = useUserStore();
</script>
