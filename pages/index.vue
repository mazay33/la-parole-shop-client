<script setup lang="ts">
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)
  await authStore.getMe()
</script>

<template>
  <div>
    <nuxt-link to="/stores">asdasd</nuxt-link>
    <pre>{{ user }}</pre>
    <!-- <HomeMain/> -->
  </div>
</template>
