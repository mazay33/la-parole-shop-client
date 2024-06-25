import type { ISizes } from '~/services/api/sizes/sizesApi.types';
import useApiService from '~/services/apiService';

const apiService = useApiService();

export const useSizesStore = defineStore('sizes', () => {
	const sizes = ref<ISizes>();

	const getSizes = async () => {
		const { data, error } = await apiService.sizes.getSizes();

		if (data.value) {
			sizes.value = data.value;
		}

		if (error.value) {
			console.error(error.value.data);
		}
	};
	return { sizes, getSizes };
});
