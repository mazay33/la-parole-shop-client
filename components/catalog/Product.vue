<script setup lang="ts">
  const props = defineProps({
    product: {
      type: Object,
      default: () => ({}),
    },
  })
</script>

<template>
  <router-link class="group" to="/">
    <div
      class="w-full aspect-w-1 aspect-h-1 rounded-md overflow-hidden sm:aspect-w-2 sm:aspect-h-3"
    >
      <img
        :src="`http://localhost:5000/${product.img[0]}`"
        class="w-full h-full object-center object-cover group-hover:opacity-75 duration-300"
      />
    </div>
    <div
      class="mt-2 flex items-center justify-between text-base font-medium text-gray-900"
    >
      <h3>
        {{ product.name }}
      </h3>
      <p>{{ product.price }}&#8381;</p>
    </div>
  </router-link>
</template>

<style scoped></style>
