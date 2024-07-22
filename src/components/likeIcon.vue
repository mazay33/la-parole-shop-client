<!-- LikeIcon.vue -->
<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';
import { useWishlistStore } from '~/modules/wishlist/stores/wishlist';
import useApiService from '~/services/apiService';

interface Props {
	productId: number;
	customClass?: string;
}

const props = defineProps<Props>();
const apiService = useApiService();
const wishlistStore = useWishlistStore();
const authStore = useAuthStore();

const isHovered = ref(false);
const isLiked = computed(() => wishlistStore.wishlistProductIds.includes(props.productId));

const addProductToWishlist = async () => {
	if (!authStore.isAuthenticated) {
		authStore.isAuthModalOpen = true;
		authStore.authModalCustomText =
			'Авторизируйтесь чтобы добавить товар в список желаемого и смотреть его с любого устройства';
		return;
	}
	await apiService.wishlist.addProductToWishList(props.productId);
	await wishlistStore.getWishlistProducts();
};

const removeProductFromWishlist = async () => {
	await apiService.wishlist.removeProductFromWishList(props.productId);
	await wishlistStore.getWishlistProducts();
};

const toggleWishlist = async () => {
	if (isLiked.value) {
		await removeProductFromWishlist();
	} else {
		await addProductToWishlist();
	}
};
</script>

<template>
	<div
		:class="['bg-white rounded-full transition duration-300 ease-in-out cursor-pointer', props.customClass]"
		@mouseover="isHovered = true"
		@mouseleave="isHovered = false"
		@click.stop="toggleWishlist"
	>
		<i
			v-if="!isLiked && !isHovered"
			class="pi pi-heart text-xl px-4 py-3 text-black transition duration-300 ease-in-out"
		></i>
		<i
			v-if="isLiked || isHovered"
			class="pi pi-heart-fill text-xl px-4 py-3 text-[--primary-color] hover:scale-110 hover:filter-drop-shadow-xl transition duration-300 ease-in-out"
		></i>
	</div>
</template>

<style scoped lang="scss"></style>
