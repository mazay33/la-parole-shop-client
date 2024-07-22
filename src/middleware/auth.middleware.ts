import { defineNuxtRouteMiddleware } from 'nuxt/app';

export default defineNuxtRouteMiddleware(async to => {
	const authStore = useAuthStore();

	setTimeout(() => {
		if (!authStore.isAuthenticated) {
			return navigateTo('/');
		}
	});
});
