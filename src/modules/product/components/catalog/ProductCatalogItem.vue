<script setup lang="ts">
import type { ProductListItem } from '~/services/api/product/productApi.types';
import placeholder from '~/public/placeholder.svg';

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
			customClass="absolute top-3 right-3 z-20"
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
			<div class="product__image loading relative">
				<img
					v-lazy="{
						src: `${config.public.api.replace('/api/', '')}/uploads/${props.product.images[0]?.url}`,
						placeholder,
					}"
					:class="props.product.images[1] ? 'first-image' : ''"
					v-if="props.product.images[0]?.url"
					alt="Product Image"
				/>
				<img
					v-lazy="{
						src: `${config.public.api.replace('/api/', '')}/uploads/${props.product.images[1]?.url}`,
						placeholder,
					}"
					:class="props.product.images[1] ? 'second-image' : ''"
					v-if="props.product.images[1]?.url"
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

		& .first-image {
			z-index: 1;
		}

		& .second-image {
			z-index: 0;
			opacity: 0;
		}

		&:hover .first-image {
			opacity: 0;
		}

		&:hover .second-image {
			opacity: 1;
			z-index: 1;
		}
		& img {
			height: 100%;
			left: 0;
			object-fit: cover;
			position: absolute;
			top: 0;
			width: 100%;
			background-color: #f5f5f5;
		}

		& img.loading {
			opacity: 0.5;
			transition: all 0.4s;
			aspect-ratio: 9/16;
			animation: skeleton-loading 0.8s linear infinite alternate;
		}

		& img.loaded {
			opacity: 1;
			transition: all 0.4s;
		}

		&.loading::before {
			content: '';
			position: absolute;
			width: 48px;
			height: 48px;
			z-index: 11111;
			border: 5px solid #fff;
			border-bottom-color: #f6b7ac;
			border-radius: 50%;
			display: block;
			box-sizing: border-box;
			animation: rotation 1s linear infinite;
			left: 45%;
			top: 42%;
			transform: translate(-50%, -50%);
		}

		@keyframes rotation {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
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

@keyframes skeleton-loading {
	0% {
		background-color: #f9fafb;
	}
	100% {
		background-color: #d1d5db;
	}
}
</style>
