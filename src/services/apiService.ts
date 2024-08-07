import HttpService from './httpService';
import AuthApi from './api/auth/authApi';
import UserApi from './api/user/userApi';
import ProductApi from './api/product/productApi';
import CartApi from './api/cart/cartApi';
import WishlistApi from './api/wishlist/wishlistApi';
import SizesApi from './api/sizes/sizesApi';
import CategoryApi from './api/category/categoryApi';
import SubCategoryApi from './api/sub-category/subCategoryApi';

export * from './api/auth/authApi';
export * from './api/user/userApi';
export * from './api/product/productApi';
export * from './api/cart/cartApi';
export * from './api/wishlist/wishlistApi';
export * from './api/sizes/sizesApi';
export * from './api/category/categoryApi';
export * from './api/sub-category/subCategoryApi';

class ApiService {
	readonly auth: AuthApi;
	readonly user: UserApi;
	readonly product: ProductApi;
	readonly cart: CartApi;
	readonly wishlist: WishlistApi;
	readonly sizes: SizesApi;
	readonly category: CategoryApi;
	readonly subCategory: SubCategoryApi;

	constructor(httpService: HttpService) {
		this.auth = new AuthApi(httpService);
		this.user = new UserApi(httpService);
		this.product = new ProductApi(httpService);
		this.cart = new CartApi(httpService);
		this.wishlist = new WishlistApi(httpService);
		this.sizes = new SizesApi(httpService);
		this.category = new CategoryApi(httpService);
		this.subCategory = new SubCategoryApi(httpService);
	}
}

let apiServiceInstance: ApiService | undefined;

const useApiService = () => {
	if (!apiServiceInstance) {
		apiServiceInstance = new ApiService(new HttpService());
	}

	return apiServiceInstance;
};

export default useApiService;
