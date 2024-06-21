<script setup>
import { inject } from '#imports';
const { closeWishList } = inject('wishs');

const favorite = useLocalStorage('favorite', []);
</script>

<template>
	<div>
		<div class="fixed top-0 left-0 h-300 w-full bg-black z-100 opacity-20"></div>
		<div class="bg-white w-160 h-300 fixed right-0 top-0 z-200 p-10">
			<div class="flex border-1 divide-y divide-slate-700">
				<h4 class="flex-1">Избранное</h4>
				<i
					class="pi pi-times cursor-pointer"
					style="font-size: 2rem"
					@click="closeWishList"
				></i>
			</div>
			<hr class="border-slate-300" />

			<favoriteItems
				v-for="item in favorite"
				:key="item.productId"
				:cartItem="item"
			/>
		</div>
	</div>
</template>
