import { authRepo } from '~/repository/Auth/AuthRepository';
import useApiService from '~/services/apiService';

const apiService = useApiService();

export const useAuthStore = defineStore(
	'auth',
	() => {
		const isLoading = ref(false);
		const user = ref();

		const login = async (email: string, password: string) => {
			isLoading.value = true;

			const { data, error } = await apiService.auth.login(email, password);

			if (data.value) {
				const accessToken = useCookie('access_token', { secure: true, sameSite: 'strict', httpOnly: true });
				const refreshToken = useCookie('refresh_token', { secure: true, sameSite: 'strict', httpOnly: true });
				accessToken.value = data?.value?.access_token;

				refreshToken.value = data?.value?.refresh_token;

				console.log({
					accessToken: accessToken.value,
					refreshToken: refreshToken.value,
				});

				await nextTick();

				await getMe();
			}
		};

		const refresh = async () => {
			const { data, error, pending } = await apiService.auth.refresh({});
			if (data.value) {
			} else {
				console.log(error.value);
			}
			isLoading.value = pending.value;
		};

		// const logout = async () => {
		//   if (authenticated) {
		//     await authRepo.logout()
		//   }
		//   authenticated.value = false
		//   user.value = null
		// }

		const getMe = async () => {
			const { data, error, pending } = await apiService.auth.getMe();
			if (data.value) {
				user.value = data.value;
			}
		};

		return {
			login,
			refresh,
			user,
			getMe,

			authenticated: computed(() => {
				return !!user.value;
			}),
			isLoading: computed(() => isLoading.value),
		};
	},

	// {
	// 	persist: {
	// 		storage: persistedState.cookiesWithOptions({
	// 			sameSite: 'strict',
	// 			secure: true,
	// 		}),
	// 	},
	// },
);
