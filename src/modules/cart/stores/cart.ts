import type { IAddProductToCartRequest, ICart, ICartProductItem } from '~/services/api/cart/cartApi.types';
import type { IProduct } from '~/services/api/product/productApi.types';
import type { IUser } from '~/services/api/user/userApi.types';
import useApiService from '~/services/apiService';

const apiService = useApiService();
interface ILocaleStorageCartProduct {
	product: IProduct;
	quantity: number;
	cupSizeId?: number;
	beltSizeId?: number;
	clothingSizeId?: number;
	configurataionId?: number;
}

export const useCartStore = defineStore(
	'cart',
	() => {
		const authStore = useAuthStore();
		const isCartSidebarVisible = ref(false);
		const cartQuantity = ref<number>();
		const cartProducts = ref<ICartProductItem[]>();

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

		const getCartLocalStorage = () => {
			const cartStorage = useLocalStorage('cart', []) as Ref<ILocaleStorageCartProduct[]>;
			//TODO: Починить типизацию
			// @ts-ignore
			cartProducts.value = cartStorage.value;
		};

		const addProductToCart = async (product: IProduct, body: IAddProductToCartRequest) => {
			if (authStore.isAuthenticated) {
				const { data } = await apiService.cart.addProductToCart(product.id, body);
				if (data.value) {
					await getCartQuantity();
				}
			} else {
				addProductToLocalStorage(product, body);
			}
		};

		const addProductToLocalStorage = (product: IProduct, body: IAddProductToCartRequest) => {
			const cartStorage = useLocalStorage('cart', []) as Ref<ILocaleStorageCartProduct[]>;

			console.log(product, body);

			// Проверяем, существует ли уже товар с такими же параметрами
			const existingProductIndex = cartStorage.value.findIndex(
				cartProduct =>
					cartProduct.clothingSizeId === body.clothingSizeId &&
					cartProduct.configurataionId === body.configurataionId &&
					cartProduct.cupSizeId === body.cupSizeId &&
					cartProduct.beltSizeId === body.beltSizeId,
			);

			if (existingProductIndex !== -1) {
				// Товар уже существует, увеличиваем его количество
				cartStorage.value[existingProductIndex].quantity += body.quantity;
			} else {
				// Товар не существует, добавляем его в корзину
				cartStorage.value.push({
					product: {
						...product,
					},
					...body,
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

		return {
			isCartSidebarVisible,
			getCart,
			cart: cartProducts,
			cartQuantity: computed(() => cartQuantity.value),
			getCartQuantity,
			addProductToCart,
		};
	},
	// {
	// 	persist: {
	// 		storage: persistedState.cookies,
	// 	},
	// },
);
