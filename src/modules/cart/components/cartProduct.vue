<script setup lang="ts">
import type { ICartProductItem } from '~/services/api/cart/cartApi.types';
const config = useRuntimeConfig();

const props = defineProps<{
	cartProduct: ICartProductItem;
}>();

const sizesStore = useSizesStore();

const { sizes } = storeToRefs(sizesStore);
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
			<h3>{{ props.cartProduct.product.name }}</h3>

			<p v-if="props.cartProduct.productConfigurationId">
				Комплектация:
				{{
					props.cartProduct.product.productConfigurations.find(
						config => config.id === props.cartProduct.productConfigurationId,
					)?.name
				}}
			</p>
			<p v-if="props.cartProduct.cupSizeId">
				Чашка бюста: {{ sizes?.bustSizes.find(bust => bust.id === props.cartProduct.cupSizeId)?.size }}
			</p>
			<p v-if="props.cartProduct.beltSizeId">
				Пояс для чулок: {{ sizes?.beltSizes.find(belt => belt.id === props.cartProduct.beltSizeId)?.size }}
			</p>
			<p v-if="props.cartProduct.clothingSizeId">
				Трусики:
				{{ sizes?.clothingSizes.find(clothing => clothing.id === props.cartProduct.clothingSizeId)?.size }}
			</p>
			<p v-if="props.cartProduct.product.sku">{{ props.cartProduct.product.sku }}</p>
		</div>

		<div class="flex ml-a items-center gap-4">
			<p class="ml-auto">{{ props.cartProduct.product.price }} р.</p>
			<i class="pi pi-times-circle cursor-pointer text-2xl text-gray-300"></i>
		</div>
	</div>
</template>

<style scoped>
p {
	margin: 0;
}
</style>
