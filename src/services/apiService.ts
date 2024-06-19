import HttpService from './httpService';
import AuthApi from './api/auth/authApi';
import UserApi from './api/user/userApi';
import ProductApi from './api/product/productApi';
import CartApi from './api/cart/cartApi';

export * from './api/auth/authApi';
export * from './api/user/userApi';
export * from './api/product/productApi';
export * from './api/cart/cartApi';

class ApiService {
	readonly auth: AuthApi;
	readonly user: UserApi;
	readonly product: ProductApi;
	readonly cart: CartApi;

	constructor(httpService: HttpService) {
		this.auth = new AuthApi(httpService);
		this.user = new UserApi(httpService);
		this.product = new ProductApi(httpService);
		this.cart = new CartApi(httpService);
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
