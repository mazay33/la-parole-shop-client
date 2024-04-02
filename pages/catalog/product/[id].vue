<template>
  <pre>
    {{ product }}
  </pre>
</template>

<script setup lang="ts">
  import { productRepository } from '@/repository/Product/productRepository'

  const productId = useRoute().params.id as string

  const { data: product } = await productRepository.getOneProduct(+productId)
</script>

<style scoped></style>
