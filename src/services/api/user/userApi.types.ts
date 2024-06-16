import type { HttpReturnType } from '~/services/httpService';

enum Role {
	USER = 'USER',
	ADMIN = 'ADMIN',
}
enum Provider {
	YANDEX = 'YANDEX',
	GOOGLE = 'GOOGLE',
}

export interface IUser {
	email: string;
	id: string;
	provider: Provider;
	roles: Role[];
	updatedAt: Date;
}

export interface IUserApi {
	getMe(): Promise<HttpReturnType<IUser>>;
}
