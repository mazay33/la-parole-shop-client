import type HttpService from '../../httpService';
import { HttpMethod, type HttpReturnType } from '../../httpService';
import BaseApi from '../base';
import type { IUser, IUserApi } from './userApi.types';

export default class AuthApi extends BaseApi implements IUserApi {
	constructor(private httpService: HttpService) {
		super();
	}

	protected getHttpService() {
		return this.httpService;
	}

	public async getMe(): Promise<HttpReturnType<IUser>> {
		const url = '/user/me';
		return await this.sendRequest<IUser>(HttpMethod.GET, url, {
			server: false,
		});
	}
}
