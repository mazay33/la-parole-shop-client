<script setup lang="ts">
import useApiService from '~/services/apiService';
import { useDebounce } from '@vueuse/core';

const apiService = useApiService();
const route = useRoute();
const router = useRouter();

const page = ref(1);
const pageSize = ref(50);
const name = ref<string | undefined>(route.query.name as string);
const subCategoryId = ref<string | undefined>(route.query.subCategoryId as string);
const categoryId = ref<string | undefined>((route.query.categoryId as string) || undefined);
const sortBy = ref<string | undefined>(route.query.sortBy as string);
const sortType = ref<'asc' | 'desc' | undefined>((route.query.sortType as 'asc' | 'desc') || undefined);
const debounceName = useDebounce(name, 500);

watch(
	[debounceName, categoryId, sortBy, sortType, subCategoryId],
	([newName, newCategoryId, newSortBy, newSortType, newSubCategoryId]) => {
		if (!newName) {
			newName = undefined;
		}
		if (!newSortBy) {
			newSortBy = undefined;
		}
		if (!newSortType) {
			newSortType = undefined;
		}
		if (!newSubCategoryId) {
			newSubCategoryId = undefined;
		}
		if (!newCategoryId) {
			newCategoryId = undefined;
		}

		router.push({
			query: {
				...route.query,
				name: newName,
				categoryId: newCategoryId,
				subCategoryId: newSubCategoryId,
				sortBy: newSortBy,
				sortType: newSortType,
			},
		});
	},
);

watch(
	() => route.query,
	() => {
		name.value = route.query.name as string | undefined;
		categoryId.value = (route.query.categoryId as string) || undefined;
		sortBy.value = (route.query.sortBy as string) || undefined;
		sortType.value = (route.query.sortType as 'asc' | 'desc') || undefined;
		subCategoryId.value = (route.query.subCategoryId as string) || undefined;
	},
);

const { data: products } = await apiService.product.getProducts({
	query: {
		page,
		pageSize,
		name: debounceName,
		categoryId,
		sortBy,
		sortType,
		subCategoryId,
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
		<ProductCatalogFilter
			v-model:model-name="name"
			v-model:model-sort-type="sortType"
			v-model:model-sort-by="sortBy"
			v-model:model-sub-category="subCategoryId"
			v-model:model-category="categoryId"
			:products-count="products.total"
		/>

		<div v-auto-animate>
			<div
				v-if="products.total > 0"
				v-auto-animate
				:class="`grid gap-y-5 gap-x-5 mt-30 ${gridClass}`"
			>
				<ProductCatalogItem
					v-for="product in products.data"
					:key="product.id"
					:product="product"
				/>
			</div>
			<div
				class="flex justify-center items-center h-[calc(100vh-400px)] border-1 border-black border-solid mt-100px"
				v-else
			>
				<h2>Ничего не найдено</h2>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
