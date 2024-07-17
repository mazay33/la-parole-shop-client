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

const gridClass = ref('grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4');

const setGridClass = (size: 'small' | 'medium' | 'large') => {
	switch (size) {
		case 'small':
			gridClass.value = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
			break;
		case 'medium':
			gridClass.value = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
			break;
		case 'large':
			gridClass.value = 'grid-cols-1 sm:grid-cols-2';
			break;
	}
};
</script>

<template>
	<div
		v-if="products?.data"
		class="max-w-[1180px] mx-auto"
	>
		<div class="flex justify-end mb-4 gap-3">
			<Button @click="setGridClass('small')"> Small </Button>
			<Button @click="setGridClass('medium')"> Medium </Button>
			<Button @click="setGridClass('large')"> Large </Button>
		</div>
		<div :class="`grid gap-y-5 gap-x-5 ${gridClass}`">
			<ProductCatalogItem
				v-for="product in products.data"
				:key="product.id"
				:product="product"
			/>
			<ProductCatalogItem
				v-for="product in products.data"
				:key="product.id"
				:product="product"
			/>
		</div>
	</div>
</template>

<style scoped></style>
