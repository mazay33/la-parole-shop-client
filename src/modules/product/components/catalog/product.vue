<script setup lang="ts">
import { computed } from '#imports';
import type { ProductListItem } from '~/services/api/product/productApi.types';

interface Props {
	product: ProductListItem;
}

const props = defineProps<Props>();
const config = useRuntimeConfig();

const cartArr = computed(() => {
	// const variationId = props.product?.variations?.length > 0 ? props.product.variations[0].id : null;

	return {
		productId: props.product?.id,
		variationId: props.product.sku,
		cup: 1,
		under: 1,
		clothing: 1,
		price: props.product?.price,
	};
});
</script>

<template>
	<div
		class="relative"
		v-if="props.product"
	>
		<nuxt-link
			class="product flex-col overflow-hidden"
			:to="`/product/${props.product.id}`"
		>
			<div class="product__image">
				<img
					v-if="product.images[0]?.url"
					:src="`${config.public.api.replace('/api/', '')}/uploads/${product.images[0]?.url}`"
				/>
			</div>
			<div class="flex-1 mt-5 text-dark">
				<div class="font-600">{{ props.product.name }}</div>
				<div class="mt-1 text-sm">{{ props.product.category?.name }}</div>
				<div class="mt-3">{{ props.product.price }} ₽</div>
			</div>
		</nuxt-link>
		<likes
			:cartArr="cartArr"
			class="absolute top-5 right-3 pt-4 pb-4"
		/>
	</div>
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

.likes {
	position: absolute;
	top: 5px;
	right: 3px;
	z-index: 10;
	pointer-events: auto;
}
</style>
