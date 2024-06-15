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
	Tokens,
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
		options?: UseFetchOptions<Tokens>,
	): Promise<HttpReturnType<Tokens>> {
		const url = '/auth/login';
		return await this.sendRequest<Tokens, ILoginRequestData>(
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

	public async getMe(options?: UseFetchOptions<IUser>): Promise<HttpReturnType<IUser>> {
		const url = '/auth/me';
		return await this.sendRequest<IUser>(HttpMethod.GET, url, {
			...options,
		});
	}

	// public async registration(
	// 	email: string,
	// 	password: string,
	// 	options?: UseFetchOptions<IRegistrationResponseData>,
	// ): Promise<HttpReturnType<IRegistrationResponseData>> {
	// 	const url = 'public/users/registration';
	// 	return await this.sendRequest<IRegistrationResponseData, IRegistrationRequestData>(
	// 		HttpMethod.POST,
	// 		url,
	// 		{
	// 			email,
	// 			password,
	// 		},
	// 		{
	// 			...options,
	// 		},
	// 	);
	// }

	public async refresh(options: UseFetchOptions<Tokens>): Promise<HttpReturnType<Tokens>> {
		const url = '/auth/refresh';
		return await this.sendRequest<Tokens, Record<string, never>>(
			HttpMethod.POST,
			url,
			{},
			{
				...options,
			},
		);
	}

	// public async logout(): Promise<HttpReturnType<{ message: string }>> {
	// 	const url = 'private/auth/logout';
	// 	return await this.sendRequest<{ message: string }, Record<string, never>>(HttpMethod.POST, url, {});
	// }
}
