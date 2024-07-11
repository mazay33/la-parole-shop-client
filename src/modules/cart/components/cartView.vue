<script setup lang="ts">
const cartStore = useCartStore();

await cartStore.getCart();

const { cartProducts, cartTotalPrice } = storeToRefs(cartStore);
</script>
<template>
	<div class="flex flex-col gap-4 font-['Raleway']">
		<div class="flex flex-col justify-center gap-4 pb-20">
			<CartProduct
				v-for="product in cartProducts"
				:key="product.id"
				:cartProduct="product"
			/>
		</div>

		<div class="fixed bottom-0 left-0 right-0 bg-white p-6 border-t-gray-300 border-t-solid border-t-1">
			<div class="flex justify-between items-center">
				<div class="text-xl">Итого: {{ cartTotalPrice }} р.</div>
				<Button>Оформить заказ</Button>
			</div>
		</div>
	</div>
	<!-- <div
			class="flex flex-col gap-6 h-[80vh] justify-center items-center"
			v-else
		>
			<p class="text-2xl">Вы еще ничего не добавили в корзину 😢</p>
			<Button class="text-xl">Перейти к каталогу</Button>
			<p>(пока не работает)</p>
			<p>Можно сюда еще просмотренные товары добавлять, если корзина пустая</p>
		</div> -->
</template>

<style scoped></style>
