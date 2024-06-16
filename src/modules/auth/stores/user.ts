import type { IUser } from '~/services/api/user/userApi.types';
import useApiService from '~/services/apiService';

const apiService = useApiService();

export const useUserStore = defineStore(
	'user',
	() => {
		const user = ref<IUser>();

		const getMe = async () => {
			const { data, error } = await apiService.user.getMe();
			if (data.value) {
				user.value = data.value;
			}
			if (error.value) {
				console.error(error.value.data);
			}
		};

		return {
			user,
			getMe,
		};
	},
	{
		persist: {
			storage: persistedState.cookies,
		},
	},
);
