import { defineNuxtRouteMiddleware } from 'nuxt/app';

export default defineNuxtRouteMiddleware(async to => {
	const authStore = useAuthStore();

	// if (!authStore.isAuthenticated && to.path !== '/auth/login') {
	// 	return await navigateTo('/auth/login');
	// }
});
