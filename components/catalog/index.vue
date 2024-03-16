<script setup lang="ts">

  // const productStore = useProductStore()

  // const { getProducts } = productStore

  // const { loading, products } = storeToRefs(productStore)

  // await getProducts()


  const { data: products, error, pending } = await useAPI('/product')


</script>
<template>
  <div class="max-w-[1180px] mx-auto">
    <div class="grid grid-cols-1 gap-y-5 sm:grid-cols-2 gap-x-5 lg:grid-cols-3 xl:gap-x-5">
      <CatalogProduct
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<style scoped></style>
