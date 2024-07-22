<script setup lang="ts">
import { useRuntimeConfig, useRouter } from '#imports';
import { onClickOutside } from '@vueuse/core';
import { useWishlistStore } from '~/modules/wishlist/stores/wishlist';

const config = useRuntimeConfig();
const authStore = useAuthStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const router = useRouter();

const { isAuthenticated } = authStore;
const { isAuthModalOpen } = storeToRefs(authStore);

await cartStore.getCartQuantity();

const isHeaderPanelOpen = ref(false);

const target = ref(null);

onClickOutside(target, event => {
	isHeaderPanelOpen.value = false;
});

const menuItems = ref([
	{ text: 'Каталог', to: '/', isPanel: true },
	{ text: 'Сертификаты', to: '/' },
	{ text: 'Индивидуальный пошив', to: '/' },
	{ text: 'О нас', to: '/' },
]);
</script>

<template>
	<header
		ref="target"
		class="fixed top-0 left-0 right-0 z-50 bg-[#f4f4f4]/[0.25] backdrop-blur-md w-full"
	>
		<div class="max-w-[1180px] mx-auto">
			<div class="h-[84px] flex items-center">
				<nuxt-link to="/">
					<img
						class="w-19 cursor-pointer"
						src="https://optim.tildacdn.com/tild3465-6133-4137-b136-333565323731/-/cover/404x364/center/center/-/format/webp/_r_.png"
						alt=""
					/>
				</nuxt-link>

				<div class="flex items-center gap-2 ml-a mr-12">
					<ul class="flex items-center gap-6 list-none">
						<transition name="fade">
							<AppHeaderPanel
								@@close="() => (isHeaderPanelOpen = false)"
								v-if="isHeaderPanelOpen"
							/>
						</transition>
						<li
							v-for="(item, index) in menuItems"
							:key="index"
							@click="item.isPanel ? (isHeaderPanelOpen = !isHeaderPanelOpen) : router.push(item.to)"
							class="p-1 cursor-pointer"
						>
							<span class="uppercase text-[--text-color] hover:text-[--primary-color] duration-200">
								{{ item.text }}
							</span>
						</li>
					</ul>
				</div>

				<div class="flex gap-6 items-center">
					<ClientOnly>
						<i
							v-if="wishlistStore.wishlistProductsQuantity && wishlistStore.wishlistProductsQuantity > 0"
							v-badge="wishlistStore.wishlistProductsQuantity"
							@click="wishlistStore.isWishlistSidebarOpen = true"
							class="pi pi-heart text-2xl cursor-pointer"
						></i>

						<i
							v-else
							@click="wishlistStore.isWishlistSidebarOpen = true"
							class="pi pi-heart text-2xl cursor-pointer"
						></i>
						<i
							v-if="cartStore.cartQuantity && cartStore.cartQuantity > 0"
							v-badge="cartStore.cartQuantity"
							@click="cartStore.isCartSidebarVisible = true"
							class="pi pi-shopping-cart text-2xl cursor-pointer"
						></i>

						<i
							v-else
							@click="cartStore.isCartSidebarVisible = true"
							class="pi pi-shopping-cart text-2xl cursor-pointer"
						></i>

						<i
							@click="!isAuthenticated ? (isAuthModalOpen = true) : useRouter().push('/profile/user')"
							:class="!isAuthenticated ? 'pi pi-sign-in ' : 'pi pi-user'"
							class="text-2xl cursor-pointer"
						></i>
					</ClientOnly>
				</div>
			</div>
		</div>
	</header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
	transform: translateY(-2rem);
	opacity: 0;
}
</style>
