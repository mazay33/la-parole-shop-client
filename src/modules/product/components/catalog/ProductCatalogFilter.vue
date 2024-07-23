<script setup lang="ts">
import type { ISubCategory } from '~/services/api/sub-category/subCategoryApi.types';
import useApiService from '~/services/apiService';

const name = defineModel('modelName');
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

watchEffect(() => {
	sortBy.value = selectedSortOption.value?.value;
	sortType.value = selectedSortOption.value?.type;
	subCategoryId.value = selectedSubCategory.value?.id.toString();
});

watch(selectedSubCategory, newSubCategory => {
	if (newSubCategory && newSubCategory.categoryId) {
		isCategoryChangeTriggeredByUser = false;
		categoryId.value = newSubCategory.categoryId.toString();
	}
});

watch(categoryId, newCategoryId => {
	if (isCategoryChangeTriggeredByUser) {
		selectedSubCategory.value = undefined; // Reset subcategory when category changes
	}
});

const { data: categories } = await apiService.category.getCategories();
const { data: subCategories } = await apiService.subCategory.getSubCategories();

const subCategoriesByCategoryId = computed(() => {
	if (!categoryId.value) return subCategories.value;
	return subCategories.value?.filter(subCategory => subCategory.categoryId == +categoryId.value!);
});

const handleCategoryClick = (id: string | undefined) => {
	isCategoryChangeTriggeredByUser = true;
	categoryId.value = id;
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
		<div class="mb-20 flex flex-col gap-10">
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
						class="min-w-[180px]"
						:options="sortOptions"
						option-label="label"
						placeholder="Cортировка"
						v-model="selectedSortOption"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
