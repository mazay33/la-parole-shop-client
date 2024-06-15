<script setup lang="ts">
  import { productRepository } from '@/repository/Product/productRepository'
  import type { IProductsData } from '~/repository/Product/types.product'

  const { data: products, error } =
    await productRepository.getAll<IProductsData>()
  if (error.value) {
    throw new Error(error.value.message)
  }
</script>
<template>
  <nuxt-link to="/">saasd</nuxt-link>

  <div v-if="products" class="max-w-[1180px] mx-auto">
    <div
      class="grid grid-cols-1 gap-y-5 sm:grid-cols-2 gap-x-5 lg:grid-cols-3 xl:gap-x-5"
    >
      <CatalogProduct v-for="product in products?.data" :product="product" />
    </div>
  </div>
</template>

<style scoped></style>
