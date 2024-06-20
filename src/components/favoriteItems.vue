<script setup lang="ts">
import type { IVariation } from '~/services/api/product/productApi.types';
import useApiService from '~/services/apiService';

const config = useRuntimeConfig();
const apiService = useApiService();

const props = defineProps({
	productId: Number,
});

const productId = props.productId;

const { data: product } = await apiService.product.getProductById(String(productId), { lazy: true });
</script>

<template>
	<div class="flex mt-8">
		<div class="flex flex-1">
			<NuxtImg
				:src="`${config.public.api.replace('/api/', '')}/uploads/${product?.img[0]?.url}`"
				alt=""
				class="rounded-lg w-20 h-25 mt-10"
			/>
			<div class="ml-5">
				<h4 class="font-light">{{ product?.name }}</h4>
				<!-- <p class="font-['Raleway'] text-xs font-normal">Артикул:</p>
				<p class="font-['Raleway'] text-xs font-normal mt--3">Чашка бюста:</p>
				<p class="font-['Raleway'] text-xs font-normal mt--3">Объем под грудью:</p>
				<p class="font-['Raleway'] text-xs font-normal mt--3">Пояс для чулок:</p>
				<p class="font-['Raleway'] text-xs font-normal mt--3">Трусики:</p> -->
				<p class="font-['Raleway'] text-sm font-normal mt--2">{{ product?.sku }}</p>
			</div>
		</div>

		<div class="flex mt-20">
			<p class="mr-15">{{ product?.price }} р.</p>
			<i
				class="pi pi-minus-circle cursor-pointer opacity-50 hover:opacity-100"
				style="font-size: 1.3rem"
			></i>
		</div>
	</div>
</template>
