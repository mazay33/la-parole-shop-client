<script setup>
useHead({
	title: 'La Parole',
});
const sizesStore = useSizesStore();
const userStore = useUserStore();

await userStore.getMe();

await sizesStore.getSizes();
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
