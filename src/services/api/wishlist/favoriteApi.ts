import type { IPaginatedResult } from '~/@types/pagination';
import type HttpService from '../../httpService';
import { HttpMethod, type HttpReturnType } from '../../httpService';
import BaseApi from '../base';
import type { IAddProductToWishListResponse } from './favoriteApi.types';
import type { UseFetchOptions } from '#app';

export default class CartApi extends BaseApi {
	constructor(private httpService: HttpService) {
		super();
	}

	protected getHttpService() {
		return this.httpService;
	}

	public async addProductToWishList(
		productId: number,
		count: number,
		options?: UseFetchOptions<IAddProductToWishListResponse>,
	): Promise<HttpReturnType<IAddProductToWishListResponse>> {
		const url = `/wishlist/add/${productId}`;
		return await this.sendRequest<IAddProductToWishListResponse, { count: number }>(
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
