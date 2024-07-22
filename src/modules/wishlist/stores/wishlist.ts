import type { IWishList, IWishListProductItem } from '~/services/api/wishlist/wishlistApi.types';
import useApiService from '~/services/apiService';

export const useWishlistStore = defineStore('wishlist', () => {
	const apiService = useApiService();
	const wishlistProducts = ref<IWishListProductItem[]>();

	const isWishlistSidebarOpen = ref(false);

	const wishlistProductIds = computed(() => {
		return wishlistProducts.value?.map(product => product.productId) || [];
	});
	const wishlistProductsQuantity = computed(() => {
		return wishlistProducts.value?.reduce((acc, product) => acc + 1, 0) || 0;
	});

	const getWishlistProducts = async () => {
		const { data } = await apiService.wishlist.getWishlistProducts();
		if (data.value) {
			wishlistProducts.value = data.value.wishlistProducts;
		}
	};

	return {
		wishlistProducts,
		wishlistProductIds,
		getWishlistProducts,
		wishlistProductsQuantity,
		isWishlistSidebarOpen,
	};
});
