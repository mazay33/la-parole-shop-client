import type { UseFetchOptions } from '#app';
import type { Tokens } from '~/services/api/auth/authApi.types';

export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig();

	const $api = $fetch.create({
		baseURL: config.public.api,

		onRequest({ options }) {
			const accessToken = useCookie('access_token', { secure: true, sameSite: 'strict', httpOnly: true });
			options.headers = accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {};
		},
		onResponse: async ({ response, options, request }) => {
			if (response.status === 401) {
				// if (import.meta.server) {
				// 	const event = useRequestEvent();
				// 	console.log(event);

				// 	const { status } = await useAsyncData(
				// 		async () => await fetchWithCookie(event!, `${config.public.api}public/auth/refresh`),
				// 	);

				// 	if (status.value === 'success') {
				// 		await navigateTo(event?.path);
				// 		return;
				// 	}
				// 	// await navigateTo('/auth/login')

				// 	isRefreshing = false;
				// }

				try {
					const accessToken = useCookie('access_token', { secure: true, sameSite: 'strict', httpOnly: true });
					const refreshToken = useCookie('refresh_token', {
						secure: true,
						sameSite: 'strict',
						httpOnly: true,
					});
					const newToken = await refresh();
					accessToken.value = newToken?.access_token;
					refreshToken.value = newToken?.refresh_token;

					options.headers = accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {};

					nextTick(() =>
						useFetch(request, { headers: useRequestHeaders(), ...(options as UseFetchOptions<any>) }),
					);
				} catch (error) {
					console.error('Token refresh failed:', error);
				}
			}
		},
	});

	async function refresh() {
		const refreshToken = useCookie('refresh_token', { secure: true, sameSite: 'strict', httpOnly: true });
		const { data, status } = await useFetch<Tokens>(`${config.public.api}auth/refresh`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${refreshToken.value}`,
			},
		});

		if (status.value === 'success') {
			return data.value;
		} else {
			throw new Error('Token refresh failed');
		}
	}

	// Expose to useNuxtApp().$api
	return {
		provide: {
			api: $api,
		},
	};
});
