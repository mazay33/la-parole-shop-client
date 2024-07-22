import type HttpService from '../../httpService';
import { HttpMethod, type HttpReturnType } from '../../httpService';
import BaseApi from '../base';
import type { ICategory } from './categoryApi.types';

export default class CategoryApi extends BaseApi {
	constructor(private httpService: HttpService) {
		super();
	}

	protected getHttpService() {
		return this.httpService;
	}

	public async getCategories(): Promise<HttpReturnType<ICategory[]>> {
		const url = '/category/list';
		return await this.sendRequest<ICategory[]>(HttpMethod.GET, url, {});
	}
}
