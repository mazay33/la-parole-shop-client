import type { IAddProductToCartRequest, ICart, ICartProductItem } from '~/services/api/cart/cartApi.types';
import type { IProduct } from '~/services/api/product/productApi.types';
import useApiService from '~/services/apiService';

const apiService = useApiService();
interface ILocaleStorageCartProduct {
	id: number;
	cartId: string;
	createdAt: Date;
	updatedAt: Date;
	productId: number;
	quantity: number;
	cupSizeId: number | null;
	beltSizeId: number | null;
	clothingSizeId: number | null;
	productConfigurationId: number | null;
}

export const useCartStore = defineStore('cart', () => {
	const sizesStore = useSizesStore();
	const authStore = useAuthStore();
	const isCartSidebarVisible = ref(false);
	const cartQuantity = ref<number>();
	const cartTotalPrice = computed(() => {
		return cartProducts.value.reduce((total, product) => {
			return total + product.product.price * product.quantity;
		}, 0);
	});
	const cartProducts = ref([] as ICartProductItem[]);

	const getCart = async () => {
		if (authStore.isAuthenticated) {
			const { data } = await apiService.cart.getCartItems();
			if (data.value) {
				cartProducts.value = data.value;
			}
		} else {
			getCartLocalStorage();
		}
	};

	const getCartLocalStorage = async () => {
		if (import.meta.server) return;
		const cartStorage = useLocalStorage('cart', []) as Ref<ILocaleStorageCartProduct[]>;

		const { data } = await apiService.cart.getProductsForCartByIds(cartStorage.value.map(item => item.productId));
		if (data.value) {
			cartProducts.value = cartStorage.value
				.map(localItem => {
					if (!data.value) return;
					const product = data.value.find(product => product.id === localItem.productId);

					if (!product) return;

					return {
						product,
						cartId: localItem.cartId,
						id: localItem.id,
						createdAt: localItem.createdAt,
						updatedAt: localItem.updatedAt,
						beltSizeId: localItem.beltSizeId || null,
						clothingSizeId: localItem.clothingSizeId || null,
						cupSizeId: localItem.cupSizeId || null,
						productConfigurationId: localItem.productConfigurationId || null,
						productId: localItem.productId,
						quantity: localItem.quantity,
						clothingSize:
							sizesStore.sizes?.clothingSizes?.find(size => size.id === localItem.clothingSizeId) || null,
						cupSize: sizesStore.sizes?.bustSizes?.find(size => size.id === localItem.cupSizeId) || null,
						beltSize: sizesStore.sizes?.beltSizes?.find(size => size.id === localItem.beltSizeId) || null,
						productConfiguration:
							product?.productConfigurations.find(
								config => config.id === localItem.productConfigurationId,
							) || null,
					} as ICartProductItem;
				})
				.filter(item => item !== null) as ICartProductItem[];
		}
	};

	const addProductToCart = async (product: IProduct, body: IAddProductToCartRequest) => {
		if (authStore.isAuthenticated) {
			const { data } = await apiService.cart.addProductToCart(product.id, body);
			if (data.value) {
				await getCartQuantity();
			}
		} else {
			addProductToLocalStorage(product, body);
			await getCartQuantity();
		}
	};

	const addProductToLocalStorage = (product: IProduct, body: IAddProductToCartRequest) => {
		if (import.meta.server) return;
		const cartStorage = useLocalStorage('cart', []) as Ref<ILocaleStorageCartProduct[]>;

		const existingProductIndex = cartStorage.value.findIndex(
			cartProduct =>
				cartProduct.cupSizeId === body.cupSizeId &&
				cartProduct.beltSizeId === body.beltSizeId &&
				cartProduct.clothingSizeId === body.clothingSizeId &&
				cartProduct.productConfigurationId === body.productConfigurationId &&
				cartProduct.productId === product.id,
		);

		if (existingProductIndex !== -1) {
			// Товар уже существует, увеличиваем его количество
			cartStorage.value[existingProductIndex].quantity += body.quantity;
		} else {
			// Товар не существует, добавляем его в корзину
			cartStorage.value.push({
				beltSizeId: body.beltSizeId || null,
				clothingSizeId: body.clothingSizeId || null,
				cupSizeId: body.cupSizeId || null,
				productConfigurationId: body.productConfigurationId || null,
				quantity: body.quantity,
				productId: product.id,
				id: body.id,
				cartId: body.cartId,
				createdAt: body.createdAt,
				updatedAt: body.updatedAt,
			});
		}
	};

	const getCartQuantity = async () => {
		nextTick(async () => {
			if (authStore.isAuthenticated) {
				const { data } = await apiService.cart.getCartQuantity();
				if (data.value) {
					cartQuantity.value = data.value.totalQuantity;
				}
			} else {
				getCartLocaleStorageQuantity();
			}
		});
	};

	const getCartLocaleStorageQuantity = () => {
		if (import.meta.server) return;
		const cartStorage = useLocalStorage('cart', []) as Ref<ILocaleStorageCartProduct[]>;

		const totalQuantity = cartStorage.value.reduce((total, cartProduct) => {
			return total + cartProduct.quantity;
		}, 0);

		cartQuantity.value = totalQuantity;
	};

	const deleteCartProduct = async (cartProductId: number) => {
		nextTick(async () => {
			if (authStore.isAuthenticated) {
				await apiService.cart.deleteCartProduct(cartProductId);
			} else {
				deleteCartProductFromLocaleStorage(cartProductId);
			}
			await getCartQuantity();
			await getCart();
		});
	};

	const deleteCartProductFromLocaleStorage = (cartProductId: number) => {
		if (import.meta.server) return;
		const cartStorage = useLocalStorage('cart', []) as Ref<ILocaleStorageCartProduct[]>;

		cartStorage.value = cartStorage.value.filter(cartProduct => cartProduct.id !== cartProductId);
	};

	// const getCartTotalAmount = async () => {
	// 	if (authStore.isAuthenticated) {
	// 		const { data } = await apiService.cart.getCartTotalAmount();
	// 		if (data.value) {
	// 			cartTotalPrice.value = data.value.totalPrice;
	// 		}
	// 	} else {
	// 		getCartTotalAmountFromLocaleStorage();
	// 	}
	// };

	// const getCartTotalAmountFromLocaleStorage = () => {
	// 	if (import.meta.server) return;
	// 	cartTotalPrice.value = cartProducts.value.reduce((total, cartProduct) => {
	// 		return total + cartProduct.quantity * cartProduct.product.price;
	// 	}, 0);
	// };

	return {
		isCartSidebarVisible,
		getCart,
		cartProducts,
		cartQuantity: computed(() => cartQuantity.value),
		getCartQuantity,
		addProductToCart,
		deleteCartProduct,
		cartTotalPrice,
	};
});
