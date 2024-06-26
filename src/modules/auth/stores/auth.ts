import useApiService from '~/services/apiService';

const apiService = useApiService();

export const useAuthStore = defineStore('auth', () => {
	const userStore = useUserStore();
	const accessToken = ref<string>();
	const isAuthenticated = computed(() => {
		return !!accessToken.value;
	});

	const login = async (email: string, password: string) => {
		const { data, error } = await apiService.auth.login(email, password);
		if (data.value) {
			accessToken.value = data?.value?.accessToken;
			await userStore.getMe();
		}
		if (error.value) {
			console.error(error.value.data);
		}
	};

	const loginWithGoogle = async (tokenQuery: string) => {
		const { data, error } = await apiService.auth.loginWithGoogle(tokenQuery);
		console.log(data);

		if (data.value) {
			accessToken.value = data?.value?.accessToken;

			await userStore.getMe();
			nextTick(async () => {
				await useRouter().push('/');
			});
		}
		if (error.value) {
			console.error(error.value.data);
		}
	};

	const loginWithYandex = async (tokenQuery: string) => {
		const { data, error } = await apiService.auth.loginWithYandex(tokenQuery);

		if (data.value) {
			accessToken.value = data?.value?.accessToken;

			await userStore.getMe();
			nextTick(async () => {
				await useRouter().push('/');
			});
		}
		if (error.value) {
			console.error(error.value.data);
		}
	};

	const logout = async () => {
		const { data, error } = await apiService.auth.logout();
		if (data.value) {
			accessToken.value = undefined;
			userStore.user = undefined;
		}
		if (error.value) {
			console.error(error.value.data);
		}
	};

	return {
		login,
		loginWithGoogle,
		loginWithYandex,
		logout,
		accessToken,
		isAuthenticated,
	};
});
