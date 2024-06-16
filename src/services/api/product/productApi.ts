import type HttpService from '../../httpService';
import { HttpMethod, type HttpReturnType } from '../../httpService';
import BaseApi from '../base';
import type { IProduct, ProductListItem } from './productApi.types';

export default class ProductApi extends BaseApi {
	constructor(private httpService: HttpService) {
		super();
	}

	protected getHttpService() {
		return this.httpService;
	}

	public async getProducts(): Promise<HttpReturnType<ProductListItem[]>> {
		const url = '/product/list';
		return await this.sendRequest<ProductListItem[]>(HttpMethod.GET, url);
	}

	public async getProductById(id: string): Promise<HttpReturnType<IProduct>> {
		const url = `/product/${id}`;
		return await this.sendRequest<IProduct>(HttpMethod.GET, url);
	}
}
