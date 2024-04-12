<template>
  <Button v-if="product" @click="addToCart(1, product.id)"
    >Добавить в корзину</Button
  >

  <pre>
    {{ product }}
  </pre>
</template>

<script setup lang="ts">
  const productSrore = useProductStore()
  const { product } = storeToRefs(productSrore)
  const cartStore = useCartStore()

  const productId = useRoute().params.id as string

  await productSrore.getProduct(+productId)

  const addToCart = async (count: number, productId: number) => {
    await cartStore.addProductToCart(count, productId)
  }
</script>

<style scoped></style>
