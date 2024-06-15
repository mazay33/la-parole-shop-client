import type { UseFetchOptions } from 'nuxt/app';
import type { FetchError } from 'ofetch';
import type { Ref } from 'vue';

import type { _AsyncData, KeysOf, PickFrom } from '#app/composables/asyncData';

export type HttpReturnType<T> = Promise<_AsyncData<PickFrom<T, KeysOf<T>> | null, FetchError<any> | null>>;

export type HttpBodyType<T> = T extends Ref<Record<string, any>> ? T : Record<string, any>;

export enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
}

export interface IHttpService {
	get<T>(url: string, options?: UseFetchOptions<T>): HttpReturnType<T>;
	post<T, U>(url: string, body: HttpBodyType<U>, options?: UseFetchOptions<T>): HttpReturnType<T>;
	put<T, U>(url: string, body: HttpBodyType<U>, options?: UseFetchOptions<T>): HttpReturnType<T>;
	delete<T>(url: string, options?: UseFetchOptions<T>): HttpReturnType<T>;
	patch<T, U>(url: string, body: HttpBodyType<U>, options?: UseFetchOptions<T>): HttpReturnType<T>;
}

export default class HttpService {
	private request<T, U>(
		method: HttpMethod,
		url: string,
		body?: HttpBodyType<U>,
		options: UseFetchOptions<T> = {},
	): HttpReturnType<T> {
		const response = useAPI<T>(url, {
			method,
			body,
			...options,
		});
		return response;
	}

	public get<T>(url: string, options: UseFetchOptions<T> = {}): HttpReturnType<T> {
		return this.request<T, never>(HttpMethod.GET, url, undefined, options);
	}

	public post<T, U>(url: string, body: HttpBodyType<U>, options: UseFetchOptions<T> = {}): HttpReturnType<T> {
		return this.request<T, U>(HttpMethod.POST, url, body, options);
	}

	public put<T, U>(url: string, body: HttpBodyType<U>, options: UseFetchOptions<T> = {}): HttpReturnType<T> {
		return this.request<T, U>(HttpMethod.PUT, url, body, options);
	}

	public patch<T, U>(url: string, body: HttpBodyType<U>, options: UseFetchOptions<T> = {}): HttpReturnType<T> {
		return this.request<T, U>(HttpMethod.PATCH, url, body, options);
	}

	public delete<T>(url: string, options: UseFetchOptions<T> = {}): HttpReturnType<T> {
		return this.request<T, never>(HttpMethod.DELETE, url, undefined, options);
	}
}
