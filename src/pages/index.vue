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
		{{ user }}

		<HomeMain />
	</div>
</template>
