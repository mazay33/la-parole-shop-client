import type { UseFetchOptions } from '#app';
import useApiService from '~/services/apiService';
import type HttpService from '../../httpService';
import { HttpMethod, type HttpReturnType } from '../../httpService';
import BaseApi from '../base';
import type {
	IAuthApi,
	ILoginRequestData,
	IRegistrationRequestData,
	IRegistrationResponseData,
	IUpdatePasswordRequestBody,
	IUser,
	AccessToken,
} from './authApi.types';

export default class AuthApi extends BaseApi {
	constructor(private httpService: HttpService) {
		super();
	}

	protected getHttpService() {
		return this.httpService;
	}

	public async login(
		email: string,
		password: string,
		options?: UseFetchOptions<AccessToken>,
	): Promise<HttpReturnType<AccessToken>> {
		const url = '/auth/login';
		return await this.sendRequest<AccessToken, ILoginRequestData>(
			HttpMethod.POST,
			url,
			{
				email,
				password,
			},
			{
				...options,
			},
		);
	}

	public async loginWithGoogle(
		tokenQuery: string,
		options?: UseFetchOptions<AccessToken>,
	): Promise<HttpReturnType<AccessToken>> {
		const url = `/auth/success-google?token=${tokenQuery}`;
		return await this.sendRequest<AccessToken>(HttpMethod.GET, url, {
			...options,
			server: false,
		});
	}

	public async loginWithYandex(
		tokenQuery: string,
		options?: UseFetchOptions<AccessToken>,
	): Promise<HttpReturnType<AccessToken>> {
		const url = `/auth/success-yandex?token=${tokenQuery}`;
		return await this.sendRequest<AccessToken>(HttpMethod.GET, url, {
			...options,
			server: false,
		});
	}

	public async getMe(options?: UseFetchOptions<IUser>): Promise<HttpReturnType<IUser>> {
		const url = '/user/me';
		return await this.sendRequest<IUser>(HttpMethod.GET, url, {
			...options,
			server: false,
		});
	}

	public async refresh(options: UseFetchOptions<AccessToken>): Promise<HttpReturnType<AccessToken>> {
		const url = '/auth/refresh-tokens';
		return await this.sendRequest<AccessToken>(HttpMethod.GET, url, {
			...options,
		});
	}

	public async logout(): Promise<HttpReturnType<string>> {
		const url = '/auth/logout';
		return await this.sendRequest<string>(HttpMethod.GET, url);
	}
}
