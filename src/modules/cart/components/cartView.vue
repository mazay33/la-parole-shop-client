<script setup lang="ts">
const cartStore = useCartStore();

await cartStore.getCart();
</script>
<template>
	<CartProduct
		v-for="product in cartStore.cart"
		:key="product.id"
		:cartProduct="product"
	/>
</template>

<style scoped></style>
