<script setup lang="ts">
import useApiService from '~/services/apiService';

const apiService = useApiService();

const { data: products } = await apiService.product.getProducts();
</script>
<template>
	<div
		v-if="products"
		class="max-w-[1180px] mx-auto"
	>
		<div class="grid grid-cols-1 gap-y-5 sm:grid-cols-2 gap-x-5 lg:grid-cols-3 xl:gap-x-5">
			<ProductCatalogProduct
				v-for="product in products"
				:product="product"
			/>
		</div>
	</div>
</template>

<style scoped></style>
