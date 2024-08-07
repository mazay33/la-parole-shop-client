<script setup lang="ts">
import useApiService from '~/services/apiService';

const apiService = useApiService();
const productId = useRoute().params.id;

const { data: product } = await apiService.product.getProductById(String(productId), {
	lazy: true,
});

const { data: productCollections } = await apiService.product.getProducts({
	query: {
		name: `${product.value?.name}`,
		page: 1,
		pageSize: 4,
	},
});

// Фильтра по категориям еще нет на бэке
const { data: similarProducts } = await apiService.product.getProducts({
	query: {
		category: product.value?.category?.id,
		page: 1,
		pageSize: 8,
	},
});
</script>

<template>
	<div class="flex flex-col font-['Raleway']">
		<div class="grid grid-cols-2 gap-10 text-lg">
			<ProductImageGallery
				v-if="product?.images.length"
				:images="product?.images"
			/>

			<ProductInfo
				v-if="product"
				:product="product"
			/>
		</div>

		<div class="flex flex-col gap-20 w-full">
			<div class="flex flex-col gap-6">
				<h3 class="uppercase font-300">{{ product?.name }} collection</h3>
				<div class="grid grid-cols-4 gap-3 gap-y-6">
					<ProductCatalogItem
						v-for="product in productCollections?.data"
						:key="product.id"
						:product="product"
					/>
				</div>
			</div>

			<div class="flex flex-col gap-6">
				<h3 class="uppercase font-300">Вам может понравится</h3>
				<div class="grid grid-cols-4 gap-3 gap-y-6">
					<ProductCatalogItem
						v-for="product in similarProducts?.data"
						:key="product.id"
						:product="product"
					/>
				</div>
			</div>
		</div>
	</div>
	<!-- <div class="mt-15">
			<accordion />
		</div> -->
</template>

<style scoped>
.border-debug {
	border: 2px solid rgba(0, 0, 0, 0.2);
}

@keyframes add-to-cart {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
	100% {
		transform: scale(1);
	}
}

.add-to-cart-animation {
	animation: add-to-cart 0.5s ease-in-out;
}
</style>
