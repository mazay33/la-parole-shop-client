import type HttpService from '../../httpService';
import { HttpMethod, type HttpReturnType } from '../../httpService';
import BaseApi from '../base';
import type { ISubCategory } from './subCategoryApi.types';

export default class CategoryApi extends BaseApi {
	constructor(private httpService: HttpService) {
		super();
	}

	protected getHttpService() {
		return this.httpService;
	}

	public async getSubCategories(): Promise<HttpReturnType<ISubCategory[]>> {
		const url = '/sub-category/list';
		return await this.sendRequest<ISubCategory[]>(HttpMethod.GET, url, {});
	}
}
