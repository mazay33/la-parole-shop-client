<script setup lang="ts">
const cartStore = useCartStore();

await cartStore.getCart();

const { cartProducts } = storeToRefs(cartStore);
</script>
<template>
	<CartProduct
		v-for="product in cartProducts"
		:key="product.id"
		:cartProduct="product"
	/>
</template>

<style scoped></style>
