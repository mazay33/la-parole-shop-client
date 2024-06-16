<script setup lang="ts">
const productId = useRoute().params.id as string;
</script>

<template>
	<pre>
    {{ productId }}
  </pre
	>
</template>

<style scoped></style>
