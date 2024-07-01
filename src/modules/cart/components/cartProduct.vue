<script setup lang="ts">
import type { ICartProductItem } from '~/services/api/cart/cartApi.types';
const config = useRuntimeConfig();

const props = defineProps<{
	cartProduct: ICartProductItem;
}>();

const cartStore = useCartStore();
</script>

<template>
	<div class="flex items-center">
		<div class>
			<img
				v-if="props.cartProduct.product.images.length"
				class="w-20 rounded"
				:src="`${config.public.api.replace('/api/', '')}/uploads/${props.cartProduct.product.images[0]?.url}`"
				alt=""
			/>
		</div>

		<div class="flex flex-col ml-6">
			<h3>{{ cartProduct.product.name }}</h3>

			<p v-if="props.cartProduct.productConfigurationId">
				Комплектация:
				{{ cartProduct.productConfiguration?.name }}
			</p>
			<p v-if="props.cartProduct.cupSizeId">Чашка бюста: {{ cartProduct.cupSize?.size }}</p>
			<p v-if="props.cartProduct.clothingSizeId">Трусики: {{ cartProduct.clothingSize?.size }}</p>
			<p v-if="props.cartProduct.beltSizeId">Пояс для чулок: {{ cartProduct.beltSize?.size }}</p>
			<p v-if="props.cartProduct.product.sku">{{ cartProduct.product.sku }}</p>
		</div>

		<div class="flex ml-a items-center gap-4">
			<p class="ml-auto">{{ cartProduct.product.price }} р.</p>
			<i
				@click="cartStore.deleteCartProduct(cartProduct.id)"
				class="pi pi-times-circle cursor-pointer text-2xl text-gray-300"
			></i>
		</div>
	</div>
</template>

<style scoped>
p {
	margin: 0;
}
</style>
