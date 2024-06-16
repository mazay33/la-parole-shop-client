import type { UseFetchOptions } from '#app';
import type { HttpReturnType } from '~/services/httpService';

export type AccessToken = {
	accessToken: string;
};

export interface ILoginRequestData {
	email: string;
	password: string;
}

export interface IRegistrationResponseData {
	email: string;
	id: string;
	is_active: boolean;
	is_superuser: boolean;
	is_verified: boolean;
	nickname: string;
}

export interface IAuthApi {
	/**
	 * Sends a request to the server to authenticate the user with the provided email and password.
	 *
	 * @param {string} email - The email of the user.
	 * @param {string} password - The password of the user.
	 * @param {UseFetchOptions<AccessToken>} [options] - Additional options for the request.
	 * @return {Promise<HttpReturnType<AccessToken>>} A promise that resolves to the response from the server.
	 */
	login(
		email: string,
		password: string,
		options?: UseFetchOptions<AccessToken>,
	): Promise<HttpReturnType<AccessToken>>;

	/**
	 * Sends a request to refresh the access token.
	 *
	 * @return {Promise<HttpReturnType<IAuthLoginResponse>>} A promise that resolves to the response from the server.
	 */
	refresh(): Promise<HttpReturnType<AccessToken>>;

	/**
	 * Logs out the user by sending a POST request to the 'private/auth/logout' endpoint.
	 *
	 * @return {Promise<HttpReturnType<string>>} A promise that resolves to the response from the server, containing a message indicating the logout status.
	 */
	logout(): Promise<HttpReturnType<string>>;
}
