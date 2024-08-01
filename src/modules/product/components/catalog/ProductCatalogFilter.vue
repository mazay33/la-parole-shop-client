<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { ISubCategory } from '~/services/api/sub-category/subCategoryApi.types';
import useApiService from '~/services/apiService';

const props = defineProps<{ productsCount: number }>();

const name = defineModel<string>('modelName');
const sortBy = defineModel<string>('modelSortBy');
const sortType = defineModel<string>('modelSortType');
const categoryId = defineModel<string>('modelCategory');
const subCategoryId = defineModel<string>('modelSubCategory');

const apiService = useApiService();

const sortOptions = [
	{ label: 'По умолчанию', type: '', value: '' },
	{ label: 'Дешевле', type: 'asc', value: 'price' },
	{ label: 'Дороже', type: 'desc', value: 'price' },
	{ label: 'Скидки', type: 'desc', value: 'discount' },
	{ label: 'Новинки', type: 'desc', value: 'createdAt' },
	{ label: 'По названию (A-Z)', type: 'asc', value: 'name' },
	{ label: 'По названию (Z-A)', type: 'desc', value: 'name' },
];
const selectedSortOption = ref(sortOptions[0]);
const selectedSubCategory = ref<ISubCategory>();

let isCategoryChangeTriggeredByUser = false;

const selectedFilters = ref<string[]>([]); // Array to hold the selected filters

watch(selectedSubCategory, newSubCategoryId => {
	console.log(newSubCategoryId, 'newSubCategory');

	if (newSubCategoryId && newSubCategoryId.categoryId) {
		isCategoryChangeTriggeredByUser = false;
		categoryId.value = newSubCategoryId.categoryId.toString();
	}
});

watch(categoryId, newCategoryId => {
	if (isCategoryChangeTriggeredByUser) {
		// Reset subcategory when category changes
		selectedSubCategory.value = undefined;
		subCategoryId.value = undefined;
	}
	updateSelectedFilters(); // Update filters when category changes
});

watch(
	() => subCategoryId,
	newSubCategoryId => {
		if (typeof newSubCategoryId === 'string' && newSubCategoryId) {
			selectedSubCategory.value = subCategories.value?.find(subCategory => subCategory.id == +newSubCategoryId);
			subCategoryId.value = selectedSubCategory.value?.id.toString();
		}
		updateSelectedFilters(); // Update filters when sub-category changes
	},
);

const { data: categories } = await apiService.category.getCategories();
const { data: subCategories } = await apiService.subCategory.getSubCategories();

const subCategoriesByCategoryId = computed(() => {
	if (!categoryId.value) return subCategories.value;
	return subCategories.value?.filter(subCategory => subCategory.categoryId == +categoryId.value!);
});

const handleCategoryClick = (id: string | undefined) => {
	isCategoryChangeTriggeredByUser = true;
	sortBy.value = undefined;
	sortType.value = undefined;
	selectedSortOption.value = sortOptions[0];
	categoryId.value = id;
	updateSelectedFilters(); // Update filters when a category is clicked
};

const onSortOptionsChange = (sortOpts: { label: string; type: string; value: string }) => {
	sortBy.value = sortOpts.value;
	sortType.value = sortOpts.type;
	updateSelectedFilters(); // Update filters when sort options change
};

const onSubCategoryChange = (subCategory: ISubCategory) => {
	if (!subCategory) {
		subCategoryId.value = undefined;
		return;
	}
	subCategoryId.value = subCategory.id.toString();
	updateSelectedFilters(); // Update filters when sub-category changes
};

const updateSelectedFilters = () => {
	selectedFilters.value = [];

	// Add sub-category filter if selected
	if (selectedSubCategory.value) {
		selectedFilters.value.push(selectedSubCategory.value.name);
	}

	// Add sort option filter if selected and not default
	if (selectedSortOption.value.value) {
		selectedFilters.value.push(selectedSortOption.value.label);
	}

	if (name.value) {
		selectedFilters.value.push(name.value);
	}
};
const route = useRoute();

onMounted(() => {
	const {
		sortBy: sortByParam,
		sortType: sortTypeParam,
		categoryId: categoryIdParam,
		subCategoryId: subCategoryIdParam,
	} = route.query;

	// Initialize sort options based on query parameters
	const sortOption = sortOptions.find(option => option.value === sortByParam && option.type === sortTypeParam);
	if (sortOption) {
		selectedSortOption.value = sortOption;
	}

	// Initialize category and subcategory based on query parameters
	if (categoryIdParam) {
		categoryId.value = categoryIdParam as string;
	}
	if (subCategoryIdParam) {
		selectedSubCategory.value = subCategories.value?.find(subCategory => subCategory.id == +subCategoryIdParam);
	}

	updateSelectedFilters(); // Update filters based on query parameters
});

watch(
	() => route.query,
	() => {
		const {
			sortBy: sortByParam,
			sortType: sortTypeParam,
			categoryId: categoryIdParam,
			subCategoryId: subCategoryIdParam,
		} = route.query;
		const sortOption = sortOptions.find(option => option.value === sortByParam && option.type === sortTypeParam);
		if (sortOption) {
			selectedSortOption.value = sortOption;
		}
		if (categoryIdParam) {
			categoryId.value = categoryIdParam as string;
		}
		if (subCategoryIdParam) {
			selectedSubCategory.value = subCategories.value?.find(subCategory => subCategory.id == +subCategoryIdParam);
		}

		updateSelectedFilters(); // Update filters based on query parameters
	},
);

const removeFilter = (filter: string) => {
	const index = selectedFilters.value.indexOf(filter);
	if (index > -1) {
		selectedFilters.value.splice(index, 1);
	}

	if (selectedSortOption.value?.label === filter) {
		selectedSortOption.value = sortOptions[0];
		sortBy.value = undefined;
		sortType.value = undefined;
	}
	if (selectedSubCategory.value?.name === filter) {
		selectedSubCategory.value = undefined;
		subCategoryId.value = undefined;
	}
	if (name.value === filter) {
		name.value = undefined;
	}
	if (filter === 'Все') {
		categoryId.value = '';
		subCategoryId.value = '';
	}
};
</script>

<template>
	<div>
		<!-- <div class="mb-20 relative">
			<img
				src="@/assets/images/catalog.png"
				alt=""
			/>
			<h2 class="absolute left-36 bottom-4 text-white text-38 font-300 font-['Cormorant_Garamond']">КАТАЛОГ</h2>
		</div> -->
		<div class="flex flex-col gap-10">
			<div class="flex items-center gap-8 justify-end uppercase">
				<template v-if="categories">
					<div
						class="cursor-pointer"
						:class="!+categoryId! ? 'text-[--primary-color]' : 'text-gray-400'"
						@click="handleCategoryClick(undefined)"
					>
						Все
					</div>
					<div
						@click="handleCategoryClick(category.id.toString())"
						v-for="category in categories"
						:key="category.id"
						class="cursor-pointer"
						:class="+categoryId! === category.id ? 'text-[--primary-color]' : 'text-gray-500'"
					>
						{{ category.name }}
					</div>
				</template>
			</div>

			<div class="flex justify-between items-center">
				<div v-if="subCategoriesByCategoryId">
					<Dropdown
						class="min-w-[180px]"
						placeholder="Раздел"
						:options="subCategoriesByCategoryId"
						option-label="name"
						v-model="selectedSubCategory"
						showClear
						@update:model-value="onSubCategoryChange"
					/>
				</div>
				<div class="flex gap-5">
					<InputGroup>
						<InputText
							v-model="name"
							placeholder="Поиск"
						/>
						<Button icon="pi pi-search" />
					</InputGroup>
					<Dropdown
						@update:model-value="onSortOptionsChange"
						class="min-w-[180px]"
						:options="sortOptions"
						option-label="label"
						placeholder="Cортировка"
						v-model="selectedSortOption"
					/>
				</div>
			</div>
		</div>
		<div class="absolute py-6">
			<div
				class="flex flex-col gap-4"
				v-auto-animate
			>
				<div
					v-if="selectedFilters.length"
					class="flex gap-2 flex-wrap"
				>
					<Chip
						v-for="filter in selectedFilters"
						:key="filter"
						:label="filter"
						class="uppercase bg-gray-200"
						removable
						@remove="removeFilter(filter)"
					/>
				</div>

				<div
					class="ml-2"
					v-if="selectedFilters.length"
				>
					Найдено: {{ props.productsCount }}
				</div>
			</div>
		</div>
	</div>
</template>
