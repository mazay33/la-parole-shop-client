<script setup lang="ts">
import useApiService from '~/services/apiService';

const apiService = useApiService();
const productId = useRoute().params.id;

const { data: product } = await apiService.product.getProductById(String(productId));
</script>

<template>
	<div class="grid grid-cols-2 gap-10 font-['Raleway'] text-lg">
		<ProductImageGallery
			v-if="product?.images.length"
			:images="product?.images"
		/>

		<ProductInfo
			v-if="product"
			:product="product"
		/>
	</div>
	<!-- <div class="mt-15">
			<accordion />
		</div> -->
</template>

<style scoped>
.border-debug {
	border: 2px solid rgba(0, 0, 0, 0.2);
}

@keyframes add-to-cart {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
	100% {
		transform: scale(1);
	}
}

.add-to-cart-animation {
	animation: add-to-cart 0.5s ease-in-out;
}
</style>
