<script setup lang="ts">
  const cartStore = useCartStore()

  const { cart } = storeToRefs(cartStore)

  await cartStore.getCartItems()

  const deleteAllProducts = async () => {
    await cartStore.deleteAllProductsFromCart()
  }
</script>

<template>
  <Button @click="deleteAllProducts" class="mb-4">Удалить все товары</Button>

  <!--<div>Количество товаров в корзине - {{ data?.cart_items?.length }}</div> -->

  <pre>{{ cart }}</pre>
</template>

<style scoped></style>
