<script setup lang="ts">
import useApiService from '~/services/apiService';

const apiService = useApiService();

const page = ref(1);
const pageSize = ref(50);

const { data: products } = await apiService.product.getProducts({
	query: {
		page,
		pageSize,
	},
});
</script>
<template>
	<div
		v-if="products"
		class="max-w-[1180px] mx-auto"
	>
		<div class="grid grid-cols-1 gap-y-5 sm:grid-cols-2 gap-x-5 lg:grid-cols-3 xl:gap-x-5">
			<ProductCatalogProduct
				v-if="products.data"
				v-for="product in products.data"
				:product="product"
			/>
			<!-- FOR TEST, Потом убрать лишние -->
			<ProductCatalogProduct
				v-if="products.data"
				v-for="product in products.data"
				:product="product"
			/>
			<ProductCatalogProduct
				v-if="products.data"
				v-for="product in products.data"
				:product="product"
			/>
			<ProductCatalogProduct
				v-if="products.data"
				v-for="product in products.data"
				:product="product"
			/>
			<!--  ______________________ -->
		</div>
	</div>
</template>

<style scoped></style>
