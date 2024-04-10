<template>
  <Button v-if="product" @click="addToCart(1, product.id)"
    >Добавить в корзину</Button
  >

  <pre>
    {{ product }}
  </pre>
</template>

<script setup lang="ts">
  import { productRepository } from '@/repository/Product/productRepository'

  const productId = useRoute().params.id as string

  const { data: product } = await productRepository.getById(+productId)

  const addToCart = async (count: number, productId: number) => {
    await productRepository.addToCart(count, productId)
  }


</script>

<style scoped></style>
