<script setup lang="ts">
import { useWishlistStore } from '../stores/wishlist';
import WishlistProduct from './WishlistProduct.vue';

const wishlistStore = useWishlistStore();
</script>
<template>
	<div class="flex flex-col gap-4 font-['Raleway']">
		<div class="flex flex-col justify-center gap-4 pt-4 pb-20">
			<WishlistProduct
				v-for="product in wishlistStore.wishlistProducts"
				:key="product.id"
				:wishlistProduct="product"
			/>
		</div>

		<div class="fixed bottom-0 left-0 right-0 bg-white p-6 border-t-gray-300 border-t-solid border-t-1">
			<div class="flex justify-between items-center">
				<Button>Удалить все</Button>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
