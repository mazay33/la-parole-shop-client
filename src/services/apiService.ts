import HttpService from './httpService';
import AuthApi from './api/auth/authApi';

export * from './api/auth/authApi';

class ApiService {
	readonly auth: AuthApi;

	constructor(httpService: HttpService) {
		this.auth = new AuthApi(httpService);
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
