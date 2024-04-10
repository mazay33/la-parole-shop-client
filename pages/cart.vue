<script setup lang="ts">
  import httpService from '~/services/httpService'

  const { data, refresh } = await httpService.get('/cart')

  const deleteAllProducts = async () => {
    await httpService.post('/product/delete-all-from-cart', {})
    refresh()
  }


</script>

<template>
  <Button @click="deleteAllProducts" class="mb-4">Удалить все товары</Button>

  <div>Количество товаров в корзине - {{ data?.cart_items?.length }}</div>

  <pre>{{ data?.cart_items }}</pre>
</template>

<style scoped></style>
