<script setup lang="ts">
import type { ProductListItem } from '~/services/api/product/productApi.types';

interface Props {
	product: ProductListItem;
}
defineProps<Props>();
</script>

<template>
	<nuxt-link
		v-if="product"
		:to="`/catalog/product/${product.id}`"
	>
		<div class="w-full aspect-w-1 aspect-h-1 rounded-md overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
			<img
				v-if="product.img[0]"
				:src="`http://localhost:5000/uploads/${product.img[0].url}`"
				class="w-full h-full object-center object-cover group-hover:opacity-75 duration-300"
			/>
		</div>
		<div class="flex flex-col mt-5 text-dark">
			<div class="font-600">{{ product.name }}</div>
			<div class="mt-1 text-sm">{{ product?.category?.name }}</div>
			<div class="mt-3">{{ product.price.toLocaleString() }} ₽</div>
		</div>
	</nuxt-link>
</template>

<style scoped></style>
