import type { UseFetchOptions } from '#app';
import type { HttpReturnType } from '~/services/httpService';

export enum Role {
	ADMIN = 'ADMIN',
	USER = 'USER',
	EMPLOYEE = 'EMPLOYEE',
}
export type Tokens = {
	access_token: string;
	refresh_token: string;
};

export interface ILoginRequestData {
	email: string;
	password: string;
}

export interface IUser {
	activationLink: string;
	createdAt: Date;
	email: string;
	id: string;
	isActivated: boolean;
	role: Role;
}
export interface IRegistrationResponseData {
	email: string;
	id: string;
	is_active: boolean;
	is_superuser: boolean;
	is_verified: boolean;
	nickname: string;
}
export interface IRegistrationRequestData {
	email: string;
	password: string;
}

export interface IUpdatePasswordRequestBody {
	old_password: string;
	new_password: string;
}

export interface IAuthApi {
	/**
	 * Sends a request to the server to authenticate the user with the provided email and password.
	 *
	 * @param {string} email - The email of the user.
	 * @param {string} password - The password of the user.
	 * @param {UseFetchOptions<IAuthLoginResponse>} [options] - Additional options for the request.
	 * @return {Promise<HttpReturnType<IAuthLoginResponse>>} A promise that resolves to the response from the server.
	 */
	getMe(options?: UseFetchOptions<IUser>): Promise<HttpReturnType<IUser>>;

	/**
	 * Sends a request to the server to authenticate the user with the provided email and password.
	 *
	 * @param {string} email - The email of the user.
	 * @param {string} password - The password of the user.
	 * @param {UseFetchOptions<IAuthLoginResponse>} [options] - Additional options for the request.
	 * @return {Promise<HttpReturnType<IAuthLoginResponse>>} A promise that resolves to the response from the server.
	 */
	login(
		email: string,
		password: string,
		options?: UseFetchOptions<IAuthLoginResponse>,
	): Promise<HttpReturnType<IAuthLoginResponse>>;

	/**
	 * Sends a request to the server to register a new user with the provided email and password.
	 *
	 * @param {string} email - The email of the user.
	 * @param {string} password - The password of the user.
	 * @param {UseFetchOptions<IRegistrationResponseData>} [options] - Additional options for the request.
	 * @return {Promise<HttpReturnType<IRegistrationResponseData>>} A promise that resolves to the response from the server.
	 */
	registration(
		email: string,
		password: string,
		options?: UseFetchOptions<IRegistrationResponseData>,
	): Promise<HttpReturnType<IRegistrationResponseData>>;

	/**
	 * Confirms a user's registration using the provided code.
	 *
	 * @param {string} code - The confirmation code sent to the user's email.
	 * @return {Promise<HttpReturnType<boolean>>} A promise that resolves to a boolean indicating if the confirmation was successful.
	 */
	confirmRegistration(code: string): Promise<HttpReturnType<boolean>>;

	/**
	 * Sends a request to resend a verification code to the specified email address.
	 *
	 * @param {string} id - The unique identifier of the user.
	 * @param {string} email - The email address to which the verification code will be sent.
	 * @return {Promise<HttpReturnType<boolean>>} A promise that resolves to a boolean indicating whether the request was successful.
	 */
	resendCode(id: string, email: string): Promise<HttpReturnType<boolean>>;

	/**
	 * Sends a request to refresh the access token.
	 *
	 * @return {Promise<HttpReturnType<IAuthLoginResponse>>} A promise that resolves to the response from the server.
	 */
	refresh(): Promise<HttpReturnType<IAuthLoginResponse>>;

	/**
	 * Updates the user's password by sending a PATCH request to the 'private/users/update/password' endpoint.
	 *
	 * @param {IUpdatePasswordRequestBody} passwords - The new passwords for the user.
	 * @return {Promise<HttpReturnType<boolean>>} A promise that resolves to the response from the server, indicating whether the password update was successful.
	 */
	updatePassword(body: IUpdatePasswordRequestBody): Promise<HttpReturnType<boolean>>;

	/**
	 * Logs out the user by sending a POST request to the 'private/auth/logout' endpoint.
	 *
	 * @return {Promise<HttpReturnType<{ message: string }>>} A promise that resolves to the response from the server, containing a message indicating the logout status.
	 */
	logout(): Promise<HttpReturnType<{ message: string }>>;

	/**
	 * Resets the password for a user by sending a PATCH request to the 'public/users/password/reset' endpoint.
	 *
	 * @param {string} email - The email of the user whose password is being reset.
	 * @return {Promise<HttpReturnType<boolean>>} A promise that resolves to the response from the server, indicating whether the password reset was successful.
	 */
	resetPassword(email: string): Promise<HttpReturnType<boolean>>;

	/**
	 * Deactivates a user by sending a POST request to the 'private/users/deactivate' endpoint.
	 *
	 * @param {string} email - The email of the user to deactivate.
	 * @return {Promise<HttpReturnType<boolean>>} A promise that resolves to a boolean indicating whether the deactivation was successful.
	 */
	deactivateUser(email: string): Promise<HttpReturnType<boolean>>;

	/**
	 * Activates a user by sending a POST request to the 'public/users/activate' endpoint.
	 *
	 * @param {string} email - The email of the user to activate.
	 * @return {Promise<HttpReturnType<boolean>>} A promise that resolves to a boolean indicating whether the activation was successful.
	 */
	activateUser(email: string): Promise<HttpReturnType<boolean>>;

	/**
	 * Confirms a user's registration using the provided code.
	 *
	 * @param {string} code - The confirmation code sent to the user's email.
	 * @return {Promise<HttpReturnType<boolean>>} A promise that resolves to a boolean indicating if the confirmation was successful.
	 */
	confirmUser(email: string): Promise<HttpReturnType<boolean>>;
}
