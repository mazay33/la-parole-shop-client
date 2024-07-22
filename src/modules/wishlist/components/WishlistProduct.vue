<script setup lang="ts">
import type { IWishList, IWishListProductItem } from '~/services/api/wishlist/wishlistApi.types';
import useApiService from '~/services/apiService';
const config = useRuntimeConfig();
const apiService = useApiService();
const props = defineProps<{
	wishlistProduct: IWishListProductItem;
}>();
</script>

<template>
	<div
		class="flex items-center mb-3 font-['Raleway'] w-full gap-2% after:content-[''] relative after:absolute after:w-[110%] after:h-[1px] after:bg-[#E5E5E5] after:-bottom-4.5 after:-left-4.5 after:last:hidden"
	>
		<div class="flex items-center gap-4">
			<img
				v-if="wishlistProduct.product?.images"
				class="w-30 object-cover rounded-lg"
				:src="`${config.public.api.replace('/api/', '')}/uploads/${props.wishlistProduct.product?.images[0]?.url}`"
				alt=""
			/>
			<div class="flex flex-col">
				<div class="mb-1">
					<p class="text-xl">{{ wishlistProduct.product.name }}</p>
					<p>{{ wishlistProduct.product.category.name }}</p>
					<p>{{ wishlistProduct.product.sku }}</p>
				</div>
			</div>
		</div>

		<div class="flex items-center ml-a">
			<Button>Добавить в корзину</Button>
			<p class="mx-4 min-w-4rem text-center text-nowrap">{{ wishlistProduct.product.price }} р.</p>
			<i
				class="pi pi-times-circle ml-4 cursor-pointer text-2xl text-gray-300 hover:text-gray-500 duration-200"
			></i>
		</div>
	</div>
</template>

<style lang="scss"></style>
