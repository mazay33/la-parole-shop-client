import HttpService from './httpService';
import AuthApi from './api/auth/authApi';
import UserApi from './api/user/userApi';
import ProductApi from './api/product/productApi';

export * from './api/auth/authApi';
export * from './api/user/userApi';
export * from './api/product/productApi';

class ApiService {
	readonly auth: AuthApi;
	readonly user: UserApi;
	readonly product: ProductApi;

	constructor(httpService: HttpService) {
		this.auth = new AuthApi(httpService);
		this.user = new UserApi(httpService);
		this.product = new ProductApi(httpService);
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
