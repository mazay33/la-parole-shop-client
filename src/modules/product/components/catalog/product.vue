<script setup lang="ts">
import type { ProductListItem } from '~/services/api/product/productApi.types';
interface Props {
	product: ProductListItem;
}
defineProps<Props>();

const config = useRuntimeConfig();
</script>

<template>
	<nuxt-link
		class="product flex-col overflow-hidden"
		v-if="product"
		:to="`/product/${product.id}`"
	>
		<div class="product__image">
			<img
				v-if="product.img"
				:src="`${config.public.api.replace('/api/', '')}/uploads/${product.img[0]?.url}`"
			/>
		</div>
		<div class="flex-1 mt-5 text-dark">
			<div class="font-600">{{ product.name }}</div>
			<div class="mt-1 text-sm">{{ product?.category?.name }}</div>
			<div class="mt-3">{{ product.price }} ₽</div>
		</div>
	</nuxt-link>
</template>

<style scoped lang="scss">
.product {
	&__image {
		position: relative;
		& img {
			height: 100%;
			left: 0;
			object-fit: cover;
			position: absolute;
			top: 0;
			width: 100%;
		}
		&::after {
			background-color: inherit;
			content: '';
			display: block;
			padding-top: 134%;
			pointer-events: none;
		}
	}
}
</style>
