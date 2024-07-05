<script setup lang="ts">
const cartStore = useCartStore();

await cartStore.getCart();

const { cartProducts, cartTotalPrice } = storeToRefs(cartStore);
</script>
<template>
	<CartProduct
		v-for="product in cartProducts"
		:key="product.id"
		:cartProduct="product"
	/>

	<div class="mt-10 font-bold text-xl">total: {{ cartTotalPrice }}</div>
</template>

<style scoped></style>
