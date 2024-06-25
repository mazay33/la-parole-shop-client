import type HttpService from '../../httpService';
import { HttpMethod, type HttpReturnType } from '../../httpService';
import BaseApi from '../base';
import type { ISizes } from './sizesApi.types';

export default class SizesApi extends BaseApi {
	constructor(private httpService: HttpService) {
		super();
	}

	protected getHttpService() {
		return this.httpService;
	}

	public async getSizes(): Promise<HttpReturnType<ISizes>> {
		const url = '/sizes/list';
		return await this.sendRequest<ISizes>(HttpMethod.GET, url, {});
	}
}
