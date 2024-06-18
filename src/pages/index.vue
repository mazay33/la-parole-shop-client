<script setup lang="ts">
definePageMeta({
	middleware: 'auth-middleware',
});
import useApiService from '~/services/apiService';

const apiService = useApiService();
const { data: user } = await apiService.user.getMe();
</script>

<template>
	<div>
		<nuxt-link to="/product/catalog">catalog</nuxt-link>

		<pre>
			{{ user }}
		</pre
		>

		<!-- <HomeMain /> -->
	</div>
</template>
