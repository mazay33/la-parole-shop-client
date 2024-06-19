<script setup>
const props = defineProps({
	likeId: Number,
});

const favorite = useLocalStorage('favorite', []);
const isFavorite = ref(favorite.value.includes(props.likeId));

const favoriteFunction = () => {
	const currentFavorites = [...favorite.value];

	const index = currentFavorites.indexOf(props.likeId);
	if (index === -1) {
		currentFavorites.push(props.likeId);
	} else {
		currentFavorites.splice(index, 1);
	}
	favorite.value = currentFavorites;
};
watch(favorite, newFavorites => {
	isFavorite.value = newFavorites.includes(props.likeId);
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
