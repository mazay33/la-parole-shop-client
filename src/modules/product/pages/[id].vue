<script setup lang="ts">
import useApiService from '~/services/apiService';

const config = useRuntimeConfig();
const apiService = useApiService();
const productId = useRoute().params.id as string;

const { data: product } = await apiService.product.getProductById(productId, {
	lazy: true,
});
</script>

<template>
	<div>
		<div class="grid grid-cols-2 gap-10">
			<div
				class="flex max-w-[560px] max-h-[745px] w-full h-full"
				v-if="product"
			>
				<NuxtImg
					:src="`${config.public.api.replace('/api/', '')}/uploads/${product.img[0]?.url}`"
					alt=""
					weight="560"
					height="745"
				/>
			</div>
			<div class="flex flex-col justify-start mx-5">
				<h2>{{ product?.name }}</h2>
				<p>Артикул: {{ product?.sku }}</p>
				<p>{{ product?.price.toLocaleString() }} ₽</p>
				<div v-if="product?.variations">
					<p>Комплектация</p>
					<div class="flex gap-2">
						<Button v-for="variation in product?.variations">
							{{ variation.name }}
						</Button>
					</div>
				</div>
				<div class="mt-5">
					<Button class="uppercase px-[30px] py-4 font-500">Добавить в корзину</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
