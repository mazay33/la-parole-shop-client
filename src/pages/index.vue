<script setup lang="ts">
import useApiService from '~/services/apiService';

const apiService = useApiService();
const { data: user } = await apiService.user.getMe();
</script>

<template>
	<div>
		<pre>{{ user }}</pre>
		<HomeMain />
	</div>
</template>
