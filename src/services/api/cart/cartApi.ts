import type { IPaginatedResult } from '~/@types/pagination';
import type HttpService from '../../httpService';
import { HttpMethod, type HttpReturnType } from '../../httpService';
import BaseApi from '../base';
import type { IAddProductToCartResponse, ICart } from './cartApi.types';
import type { UseFetchOptions } from '#app';

export default class CartApi extends BaseApi {
	constructor(private httpService: HttpService) {
		super();
	}

	protected getHttpService() {
		return this.httpService;
	}

	public async getCartItems(options?: UseFetchOptions<ICart>): Promise<HttpReturnType<ICart>> {
		const url = '/cart';
		return await this.sendRequest<ICart>(HttpMethod.GET, url, {
			...options,
			server: false,
		});
	}

	public async addProductToCart(
		productId: number,
		count: number,
		options?: UseFetchOptions<IAddProductToCartResponse>,
	): Promise<HttpReturnType<IAddProductToCartResponse>> {
		const url = `/cart/add/${productId}`;
		return await this.sendRequest<IAddProductToCartResponse, { count: number }>(
			HttpMethod.POST,
			url,
			{
				count,
			},
			{
				...options,
			},
		);
	}
}
