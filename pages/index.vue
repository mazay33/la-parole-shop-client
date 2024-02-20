<script setup lang="ts">
  const productStore = useProductStore()
  const authStore = useAuthStore()

  const { loading, products } = storeToRefs(productStore)
  const {  users } = storeToRefs(authStore)

  const {getProducts} = productStore
  const {getUsers} = authStore

  await getUsers()
  // await getProducts()
</script>

<template>
<div>
  <nuxt-link to="/stores">asdasd</nuxt-link>
  <pre>{{ authStore.users }}</pre>
  <!-- <pre>{{ productStore.products }}</pre> -->
  <!-- <HomeMain/> -->
</div>
</template>
