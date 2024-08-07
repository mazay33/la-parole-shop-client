import type { ICategory } from '~/services/api/category/categoryApi.types';
import type { ISubCategory } from '~/services/api/sub-category/subCategoryApi.types';
import useApiService from '~/services/apiService';

const apiService = useApiService();

export const useCategoryStore = defineStore('categories', () => {
	const categories = ref<ICategory[]>();
	const subCategories = ref<ISubCategory[]>();

	const getCategories = async () => {
		const { data: categoriesData } = await apiService.category.getCategories();

		if (categoriesData.value) {
			categories.value = categoriesData.value;
		}
	};

	const getSubCategories = async () => {
		const { data: subCategoriesData } = await apiService.subCategory.getSubCategories();

		if (subCategoriesData.value) {
			subCategories.value = subCategoriesData.value;
		}
	};
	return { categories, subCategories, getSubCategories, getCategories };
});
