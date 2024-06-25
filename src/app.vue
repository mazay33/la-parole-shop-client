<script setup>
useHead({
	title: 'La Parole',
});

const authStore = useAuthStore();
const userStore = useUserStore();
if (authStore.isAuthenticated) {
	await userStore.getMe();
}
</script>

<template>
	<div id="#app">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<style lang="scss">
@import 'App.scss';

.page-enter-active,
.page-leave-active {
	transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(1rem);
}
</style>
