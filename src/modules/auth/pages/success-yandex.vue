<template>
	<div>Success</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'auth',
});
const authStore = useAuthStore();
const route = useRoute();
await authStore.loginWithYandex(String(route.query.token));
</script>

<style scoped></style>
