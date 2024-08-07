<script setup>
import { useWishlistStore } from './modules/wishlist/stores/wishlist';

useHead({
	title: 'La Parole',
});
const categoryStore = useCategoryStore();
const sizesStore = useSizesStore();
const userStore = useUserStore();
const authStore = useAuthStore();
const wishlistStore = useWishlistStore();

await userStore.getMe();

if (authStore.isAuthenticated) {
	await wishlistStore.getWishlistProducts();
}

await sizesStore.getSizes();
await categoryStore.getCategories();
await categoryStore.getSubCategories();
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
