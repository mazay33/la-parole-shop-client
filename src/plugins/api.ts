import type { AccessToken } from '~/services/api/auth/authApi.types';

export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig();
	const authStore = useAuthStore();
	const { accessToken } = storeToRefs(authStore);

	const $api = $fetch.create({
		baseURL: config.public.api,
		credentials: 'include',
		retry: 1,
		retryStatusCodes: [401],

		onRequest({ options }) {
			options.headers = accessToken.value ? { Authorization: `${accessToken.value}` } : {};
		},
		onResponse: async ({ response, options, request }) => {
			if (response.status === 401) {
				try {
					const newToken = await refresh();
					accessToken.value = newToken?.accessToken;
					options.headers = accessToken.value ? { Authorization: `${accessToken.value}` } : {};
				} catch (error) {
					options.retry = false;
					await authStore.logout();
					console.error('Token refresh failed:', error);
				}
			}
		},
	});

	let refreshTokenPromise: Promise<AccessToken | null> | null = null;

	async function refresh() {
		if (!refreshTokenPromise) {
			refreshTokenPromise = (async () => {
				try {
					const { data, status } = await useFetch<AccessToken>(`${config.public.api}auth/refresh-tokens`, {
						method: 'GET',
						credentials: 'include',
					});

					if (status.value === 'success') {
						return data.value;
					} else {
						throw new Error('Token refresh failed');
					}
				} catch (error) {
					console.error('Token refresh failed:', error);
					throw error;
				} finally {
					refreshTokenPromise = null;
				}
			})();
		}

		return refreshTokenPromise;
	}

	// Expose to useNuxtApp().$api
	return {
		provide: {
			api: $api,
		},
	};
});
