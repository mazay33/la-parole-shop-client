import type { IPaginatedResult } from '~/@types/pagination';
import type HttpService from '../../httpService';
import { HttpMethod, type HttpReturnType } from '../../httpService';
import BaseApi from '../base';
import type { IAddProductToWishListResponse, IWishList, IWishListProductItem } from './wishlistApi.types';
import type { UseFetchOptions } from '#app';

export default class WishlistApi extends BaseApi {
	constructor(private httpService: HttpService) {
		super();
	}

	protected getHttpService() {
		return this.httpService;
	}

	public async getWishlistProducts(options?: UseFetchOptions<IWishList>): Promise<HttpReturnType<IWishList>> {
		const url = '/wishlist';
		return await this.sendRequest<IWishList>(HttpMethod.GET, url, {
			...options,
		});
	}

	public async addProductToWishList(
		productId: number,
		options?: UseFetchOptions<IAddProductToWishListResponse>,
	): Promise<HttpReturnType<IAddProductToWishListResponse>> {
		const url = `/wishlist/add/${productId}`;
		return await this.sendRequest<IAddProductToWishListResponse, null>(HttpMethod.POST, url, {
			...options,
		});
	}

	public async removeProductFromWishList(productId: number): Promise<HttpReturnType<{ deleted: boolean }>> {
		const url = `/wishlist/remove/${productId}`;
		return await this.sendRequest<{ deleted: boolean }>(HttpMethod.DELETE, url);
	}
}
