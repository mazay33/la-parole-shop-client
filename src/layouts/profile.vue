<template>
	<div>
		<Link
			rel="stylesheet"
			:href="themeStore.link"
		/>
		<div
			class="layout-wrapper"
			:class="containerClass"
		>
			<AppHeader />
			<div class="layout-default-container">
				<div class="layout-main">
					<TabMenu
						:pt="{
							menu: 'bg-inherit!',
							label: 'text-[--text-color]!',
							action: 'bg-inherit! ',
						}"
						:model="items"
						><template #item="{ item, props }">
							<nuxt-link
								v-if="item.route"
								v-slot="{ href, navigate }"
								:to="item.route"
								custom
							>
								<a
									v-ripple
									:href="href"
									v-bind="props.action"
									@click="navigate"
								>
									<span v-bind="props.icon" />
									<span v-bind="props.label">{{ item.label }}</span>
								</a>
							</nuxt-link>
						</template>
					</TabMenu>

					<div class="p-4">
						<router-view />
					</div>
				</div>
				<Sidebar
					class="xl:w-[45vw] w-[55vw]"
					blockScroll
					v-model:visible="cartStore.isCartSidebarVisible"
					header="Корзина"
					position="right"
				>
					<CartView />
				</Sidebar>
				<Sidebar
					class="xl:w-[45vw] w-[55vw]"
					blockScroll
					v-model:visible="wishlistStore.isWishlistSidebarOpen"
					header="Избранное"
					position="right"
				>
					<Wishlist />
				</Sidebar>
				<AppFooter />
			</div>
			<Dialog
				@after-hide="authStore.authModalCustomText = ''"
				v-model:visible="isAuthModalOpen"
				modal
				header="Вход"
				:style="{ width: '40rem' }"
				:pt="{
					mask: {
						style: 'backdrop-filter: blur(4px)',
					},
				}"
			>
				<AuthModal @@close="isAuthModalOpen = false" />
			</Dialog>
			<div class="layout-mask" />
		</div>
	</div>
</template>

<script setup lang="ts">
import Wishlist from '~/modules/wishlist/components/Wishlist.vue';
import { useWishlistStore } from '~/modules/wishlist/stores/wishlist';

const themeStore = useThemeStore();
const cartStore = useCartStore();
const authStore = useAuthStore();
const { isAuthModalOpen } = storeToRefs(authStore);
const wishlistStore = useWishlistStore();

const items = ref([
	{ label: 'Профиль', icon: 'pi pi-user', route: '/profile/user' },
	{ label: 'Мои заказы', icon: 'pi  pi-list', route: '/profile/orders' },
	{ label: 'Адреса', icon: 'pi pi-map-marker', route: '/profile/addresses' },
]);

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const containerClass = computed(() => {
	return {
		dark: themeStore.isDarkMode,
		'layout-overlay': layoutConfig.menuMode.value === 'overlay',
		'layout-static': layoutConfig.menuMode.value === 'static',
		'layout-static-inactive':
			layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
		'layout-overlay-active': layoutState.overlayMenuActive.value,
		'layout-mobile-active': layoutState.staticMenuMobileActive.value,
		'p-input-filled': layoutConfig.inputStyle.value === 'filled',
		'p-ripple-disabled': !layoutConfig.ripple.value,
	};
});
</script>

<style lang="scss">
.layout-default-container {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	justify-content: space-between;
	padding: 7rem 5rem 2rem 5rem;
	transition: margin-left 0.2s;
}
.layout-main {
	max-width: 1180px;
	width: 100%;
	padding: 7px;
	margin: auto;
}

.p-sidebar .p-sidebar-header {
	@apply border-b-1 border-b-solid border-gray-300;
	&-content {
		@apply text-2xl font-['Raleway'] font-600 py-3;
	}
}
</style>
