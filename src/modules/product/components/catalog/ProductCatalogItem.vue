<script setup lang="ts">
import type { ProductListItem } from '~/services/api/product/productApi.types';

interface Props {
	product: ProductListItem;
}

const props = defineProps<Props>();
const config = useRuntimeConfig();
</script>

<template>
	<div
		class="relative"
		v-if="props.product"
	>
		<LikeIcon
			:productId="props.product.id"
			customClass="absolute top-3 right-3 z-10"
		/>
		<!-- TODO: new and bestseller on backend -->
		<Tag
			v-if="false"
			class="absolute top-3 left-3 z-10 p-2 uppercase rounded-none text-base font-600"
			severity="secondary"
			value="New"
		></Tag>
		<Tag
			v-else-if="false"
			class="absolute top-3 left-3 z-10 p-2 uppercase rounded-none text-base font-600"
			severity="secondary"
			value="Bestseller"
		></Tag>
		<Tag
			v-else-if="props.product.discount"
			class="absolute top-3 left-3 z-10 p-2 uppercase rounded-none text-base font-600"
			severity="secondary"
			:value="`Sale ${props.product.discount}%`"
		></Tag>
		<nuxt-link
			class="product flex-col overflow-hidden"
			:to="`/product/${props.product.id}`"
		>
			<div class="product__image relative">
				<img
					:class="product.images[1] ? 'hover:opacity-100 duration-200' : ''"
					v-if="product.images[0]?.url"
					:src="`${config.public.api.replace('/api/', '')}/uploads/${product.images[0]?.url}`"
				/>
				<img
					v-if="product.images[1]?.url"
					class="opacity-0 hover:opacity-100 duration-200"
					:src="`${config.public.api.replace('/api/', '')}/uploads/${product.images[1]?.url}`"
					alt=""
				/>
			</div>
			<div class="flex-1 mt-5 text-dark">
				<div class="font-600">{{ props.product.name }}</div>
				<div class="mt-1 text-sm">{{ props.product.category?.name }}</div>
				<div class="mt-3">{{ props.product.price }} ₽</div>
			</div>
		</nuxt-link>
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
