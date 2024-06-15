<script setup lang="ts">
function someErrorLogger(err) {
  console.log('got an error', err);
}
</script>

<template>
  <div>
    <NuxtErrorBoundary @error="someErrorLogger">
      <Catalog />
      <template #error="ctx"> <span class="text-red">Error:</span> {{ ctx.error }}  </template>
    </NuxtErrorBoundary>
  </div>
</template>

<style scoped></style>
