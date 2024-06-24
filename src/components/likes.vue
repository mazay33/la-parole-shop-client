<script setup>
const props = defineProps({
	cartArr: {
		productId: Number,
		variationId: String,
		cup: Number,
		under: Number,
		clothing: Number,
		price: Number,
	},
});

const favorite = useLocalStorage('favorite', []);
const isFavorite = ref(
	favorite.value.some(
		item => item.productId === props.cartArr.productId && item.variationId === props.cartArr.variationId,
	),
);

const favoriteFunction = () => {
	const currentFavorites = [...favorite.value];
	const index = currentFavorites.findIndex(
		item => item.productId === props.cartArr.productId && item.variationId === props.cartArr.variationId,
	);

	if (index === -1) {
		currentFavorites.push(props.cartArr);
	} else {
		currentFavorites.splice(index, 1);
	}
	favorite.value = currentFavorites;
};

watch(favorite, newFavorites => {
	isFavorite.value = newFavorites.some(
		item => item.productId === props.cartArr.productId && item.variationId === props.cartArr.variationId,
	);
});
</script>

<template>
	<Button
		:class="[
			'ml-3 pr-2 text-black bg-white rounded-full border border-slate-300 hover:border-slate-400',
			isFavorite ? 'pi pi-heart-fill text-red-300' : 'pi pi-heart',
		]"
		style="font-size: 1.2rem"
		@click="favoriteFunction()"
	></Button>
</template>
