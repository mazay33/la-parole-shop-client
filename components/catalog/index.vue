<script setup lang="ts">
  import { productRepository } from '@/repository/Product/productRepository'

  const { data: products } = await productRepository.getAllProducts()
</script>
<template>
  <nuxt-link to="/">saasd</nuxt-link>
  <div class="max-w-[1180px] mx-auto">
    <div
      class="grid grid-cols-1 gap-y-5 sm:grid-cols-2 gap-x-5 lg:grid-cols-3 xl:gap-x-5"
    >
      <CatalogProduct v-for="product in products?.data" :product="product" />
    </div>
  </div>
</template>

<style scoped></style>
~/repository/productRepository
