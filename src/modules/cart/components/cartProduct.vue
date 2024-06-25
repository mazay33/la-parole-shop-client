<script setup lang="ts">
import type { ICartProductItem } from '~/services/api/cart/cartApi.types';
const config = useRuntimeConfig();

const props = defineProps<{
	product: ICartProductItem;
}>();

const sizesStore = useSizesStore();

const { sizes } = storeToRefs(sizesStore);

console.log(props.product);
</script>

<template>
	<div class="flex items-center">
		<div class>
			<img
				v-if="props.product.product.images.length"
				class="w-20 rounded"
				:src="`${config.public.api.replace('/api/', '')}/uploads/${props.product.product.images[0]?.url}`"
				alt=""
			/>
		</div>

		<div class="flex flex-col ml-6">
			<h3>{{ props.product.product.name }}</h3>

			<p v-if="props.product.configurataionId">
				Комплектация:
				{{
					props.product.product.productConfigurations.find(
						config => config.id === props.product.configurataionId,
					)?.name
				}}
			</p>
			<p v-if="props.product.cupSizeId">
				Чашка бюста: {{ sizes?.bustSizes.find(bust => bust.id === props.product.cupSizeId)?.size }}
			</p>
			<p v-if="props.product.beltSizeId">
				Пояс для чулок: {{ sizes?.beltSizes.find(belt => belt.id === props.product.beltSizeId)?.size }}
			</p>
			<p v-if="props.product.clothingSizeId">
				Трусики: {{ sizes?.clothingSizes.find(clothing => clothing.id === props.product.clothingSizeId)?.size }}
			</p>
			<p v-if="props.product.product.sku">{{ props.product.product.sku }}</p>
		</div>

		<div class="flex ml-a items-center gap-4">
			<p class="ml-auto">{{ props.product.product.price }} р.</p>
			<i class="pi pi-times-circle cursor-pointer text-2xl text-gray-300"></i>
		</div>
	</div>
</template>

<style scoped>
p {
	margin: 0;
}
</style>
