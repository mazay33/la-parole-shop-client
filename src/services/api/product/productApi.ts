import type { IPaginatedResult } from '~/@types/pagination';
import type HttpService from '../../httpService';
import { HttpMethod, type HttpReturnType } from '../../httpService';
import BaseApi from '../base';
import type { IProduct, ProductListItem } from './productApi.types';
import type { UseFetchOptions } from '#app';

export default class ProductApi extends BaseApi {
	constructor(private httpService: HttpService) {
		super();
	}

	protected getHttpService() {
		return this.httpService;
	}

	public async getProducts(
		options?: UseFetchOptions<IPaginatedResult<ProductListItem>>,
	): Promise<HttpReturnType<IPaginatedResult<ProductListItem>>> {
		const url = '/product/list';
		return await this.sendRequest<IPaginatedResult<ProductListItem>>(HttpMethod.GET, url, {
			...options,
		});
	}

	public async getProductById(id: string): Promise<HttpReturnType<IProduct>> {
		const url = `/product/${id}`;
		return await this.sendRequest<IProduct>(HttpMethod.GET, url);
	}
}
