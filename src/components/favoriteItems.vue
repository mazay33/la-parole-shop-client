<script setup lang="ts">
import type { IVariation } from '~/services/api/product/productApi.types';
import useApiService from '~/services/apiService';
import { inject } from '#imports';

const config = useRuntimeConfig();
const apiService = useApiService();

const props = defineProps({
	cartItem: {
		type: Object,
		required: true,
	},
});

const productId = props.cartItem.productId;

const { data: product } = await apiService.product.getProductById(String(productId), { lazy: true });

const { closeWishList } = inject('wishs');

const favorite = useLocalStorage('favorite', []);

const removeFromList = () => {
	const currentFavorites = [...favorite.value];
	const index = currentFavorites.findIndex(
		item => item.productId === props.cartItem.productId && item.variationId === props.cartItem.variationId,
	);
	if (index !== -1) {
		currentFavorites.splice(index, 1);
	}
	favorite.value = currentFavorites;
};
</script>

<template>
	<div class="flex mt-8">
		<div class="flex flex-1">
			<NuxtImg
				:src="`${config.public.api.replace('/api/', '')}/uploads/${product?.img[0]?.url}`"
				alt=""
				class="rounded-lg w-20 h-25 mt-10"
			/>
			<div class="ml-5 font-['Raleway']">
				<nuxt-link
					:to="`/product/${product?.id}`"
					@click="closeWishList"
					><h4 class="font-normal">
						{{ product?.name }}
					</h4></nuxt-link
				>

				<p class="text-xs font-normal mt--2">
					Чашка бюста: {{ product?.cup_sizes.find(size => size.id === props.cartItem.cup)?.size }}
				</p>
				<p class="text-xs font-normal mt--3">
					Объем под грудью:
					{{ product?.underbust_sizes.find(under => under.id === props.cartItem.under)?.size }}
				</p>
				<p class="text-xs font-normal mt--3">
					Трусики:
					{{ product?.clothing_sizes.find(clothing => clothing.id === props.cartItem.clothing)?.size }}
				</p>
				<p class="text-sm font-normal mt--2">
					{{ product?.variations.find(variationId => variationId.id === props.cartItem.variationId)?.sku }}
				</p>
			</div>
		</div>

		<div class="flex mt-20">
			<p class="mr-15">{{ props.cartItem.price.toLocaleString() }} ₽</p>
			<i
				class="pi pi-minus-circle cursor-pointer opacity-50 hover:opacity-100"
				style="font-size: 1.3rem"
				@click="removeFromList"
			></i>
		</div>
	</div>
</template>
