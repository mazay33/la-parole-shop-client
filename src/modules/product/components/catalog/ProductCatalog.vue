<script setup lang="ts">
import useApiService from '~/services/apiService';
import { useDebounce } from '@vueuse/core';

const apiService = useApiService();
const route = useRoute();
const router = useRouter();

const page = ref(1);
const pageSize = ref(50);
const name = ref<string | undefined>(route.query.name as string);
const categoryId = ref<string | undefined>((route.query.categoryId as string) || undefined);
const sortBy = ref<string | undefined>(route.query.sortBy as string);
const sortType = ref<'asc' | 'desc' | undefined>((route.query.sortType as 'asc' | 'desc') || undefined);
const debounceName = useDebounce(name, 500);

watch([debounceName, categoryId, sortBy, sortType], ([newName, newCategoryId, newSortBy, newSortType]) => {
	if (!newName) {
		newName = undefined;
	}
	if (!newSortBy) {
		newSortBy = undefined;
	}
	if (!newSortType) {
		newSortType = undefined;
	}
	router.push({
		query: {
			...route.query,
			name: newName,
			categoryId: newCategoryId,
			sortBy: newSortBy,
			sortType: newSortType,
		},
	});
});

const { data: products } = await apiService.product.getProducts({
	query: {
		page,
		pageSize,
		name: debounceName,
		categoryId,
		sortBy: sortBy,
		sortType: sortType,
	},
});

const gridClass = ref('grid-cols-1 sm:grid-cols-2 lg:grid-cols-3');

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
		<!-- TODO: grid -->
		<!-- <div class="flex justify-end mb-4 gap-3">
			<Button @click="setGridClass('small')"> Small </Button>
			<Button @click="setGridClass('medium')"> Medium </Button>
			<Button @click="setGridClass('large')"> Large </Button>
		</div> -->

		<!-- TODO: filter component -->
		<!--  -->
		<ProductCatalogFilter
			v-model:model-name="name"
			v-model:model-sort-type="sortType"
			v-model:model-sort-by="sortBy"
			:category-id="categoryId"
			@update:category-id="v => (categoryId = v)"
		/>

		<div
			v-auto-animate
			:class="`grid gap-y-5 gap-x-5 ${gridClass}`"
		>
			<ProductCatalogItem
				v-for="product in products.data"
				:key="product.id"
				:product="product"
			/>
		</div>
	</div>
</template>

<style scoped>
.list-enter-from {
	opacity: 0;
	transform: scale(0.6);
}
.list-enter-active {
	transition: all 0.4s ease;
}
.list-leave-to {
	opacity: 0;
	transform: scale(0.6);
}
.list-leave-active {
	transition: all 0.4s ease;
	position: absolute;
	width: 0;
}
.list-move {
	transition: all 0.3s ease;
}

/* switch transitions */
.switch-enter-from,
.switch-leave-to {
	opacity: 0;
	transform: translateY(20px);
}
.switch-enter-active {
	transition: all 0.5s ease;
}
.switch-leave-active {
	transition: all 0.5s ease;
	position: absolute;
	width: 100%;
}
</style>
