import type { UseFetchOptions } from '#app';

import type { HttpBodyType, HttpReturnType } from '../httpService';
import HttpService, { HttpMethod } from '../httpService';

export default abstract class BaseApi {
	protected abstract getHttpService(): HttpService;

	// Сигнатура для методов без тела запроса
	protected async sendRequest<TResponse>(
		httpMethod: HttpMethod.GET | HttpMethod.DELETE,
		resourcePath: string,
		options?: UseFetchOptions<TResponse>,
	): Promise<HttpReturnType<TResponse>>;

	// Сигнатура для методов с телом запроса
	protected async sendRequest<TResponse, TRequest>(
		httpMethod: HttpMethod.POST | HttpMethod.PUT | HttpMethod.PATCH,
		resourcePath: string,
		request: HttpBodyType<TRequest>,
		options?: UseFetchOptions<TResponse>,
	): Promise<HttpReturnType<TResponse>>;

	// Реализация метода
	protected async sendRequest<TResponse, TRequest = void>(
		httpMethod: HttpMethod,
		resourcePath: string,
		requestOrOptions?: HttpBodyType<TRequest> | UseFetchOptions<TResponse>,
		options?: UseFetchOptions<TResponse>,
	): Promise<HttpReturnType<TResponse>> {
		const currentResourcePath = this.getResourcePath(resourcePath);
		const httpService = this.getHttpService();

		let requestOptions: UseFetchOptions<TResponse> | undefined;
		if (httpMethod === HttpMethod.GET || httpMethod === HttpMethod.DELETE) {
			requestOptions = requestOrOptions as UseFetchOptions<TResponse>;
		} else {
			requestOptions = options;
		}

		const httpMethodMappingHandler: Record<HttpMethod, () => HttpReturnType<TResponse>> = {
			[HttpMethod.GET]: () => httpService.get<TResponse>(currentResourcePath, requestOptions),
			[HttpMethod.POST]: () =>
				httpService.post<TResponse, TRequest>(
					currentResourcePath,
					requestOrOptions as HttpBodyType<TRequest>,
					requestOptions,
				),
			[HttpMethod.PATCH]: () =>
				httpService.patch<TResponse, TRequest>(
					currentResourcePath,
					requestOrOptions as HttpBodyType<TRequest>,
					requestOptions,
				),
			[HttpMethod.PUT]: () =>
				httpService.put<TResponse, TRequest>(
					currentResourcePath,
					requestOrOptions as HttpBodyType<TRequest>,
					requestOptions,
				),
			[HttpMethod.DELETE]: () => httpService.delete<TResponse>(currentResourcePath, requestOptions),
		};

		const requestMethod = httpMethodMappingHandler[httpMethod];

		if (!requestMethod) {
			throw new Error(`Method ${httpMethod} is not supported`);
		}

		return await requestMethod();
	}

	getResourcePath(resourceName: string) {
		return resourceName;
	}
}
