<script lang="ts" setup>
const config = useRuntimeConfig();
const authStore = useAuthStore();
const cartStore = useCartStore();
const router = useRouter();

const { isAuthenticated } = authStore;

await cartStore.getCartQuantity();

const items = ref([
	{
		label: 'Каталог',
		root: true,
		items: [
			[
				{
					label: 'КОМПЛЕКТЫ',
					items: [
						{ label: 'ВСЕ КОМПЛЕКТЫ', link: '/product/catalog' },
						{ label: 'BESTSELLERS' },
						{ label: 'БАЗОВЫЕ КОМПЛЕКТЫ' },
						{ label: 'КРУЖЕВНОЕ БЕЛЬЕ' },
						{ label: 'ЧЕРНОЕ БЕЛЬЕ' },
						{ label: 'ТЕЛЕСНОЕ БЕЛЬЕ' },
						{ label: 'НЕЖНОЕ БЕЛЬЕ' },
						{ label: 'КРАСНОЕ БЕЛЬЕ' },
						{ label: 'КРАСНОЕ БЕЛЬЕ' },
						{ label: 'БЕЛЬЕ ДЛЯ СВИДАНИЙ' },
					],
				},
			],
			[
				{
					label: 'БЮСТГАЛЬТЕРЫ',
					items: [
						{ label: 'ВСЕ БЮСТГАЛЬТЕРЫ' },
						{ label: 'КЛАССИЧЕСКАЯ ЧАШКА' },
						{ label: 'УКОРОЧЕННАЯ ЧАШКА' },
						{ label: 'БАЛКОНЕТ' },
						{ label: 'КОРСЕТ' },
					],
				},
			],
			[
				{
					label: 'ТРУСИКИ',
					items: [
						{ label: 'ВСЕ ТРУСИКИ' },
						{ label: 'СТРИНГИ' },
						{ label: 'СТРИНГИ НА РЕГУЛЯТОРАХ' },
						{ label: 'БРАЗИЛЬЯНО' },
						{ label: 'БРАЗИЛЬЯНО НА РЕГУЛЯТОРАХ' },
						{ label: 'ВЫСОКИЕ' },
						{ label: 'КРУЖЕВНЫЕ' },
					],
				},
			],
			[
				{
					label: 'АКСЕССУАРЫ',
					items: [{ label: 'ПОЯСА' }, { label: 'Посмотреть все' }],
				},
			],
		],
	},
	{
		label: 'Новиники',
		root: true,
	},
	{
		label: 'Сертификаты',
		root: true,
	},
	{
		label: 'Индивидуальный пошив',
		root: true,
	},
	{
		label: 'Скидки',
		root: true,
	},
	{
		label: 'О нас',
		root: true,
	},
]);

const isAuthModalOpen = ref(false);

// const wishListOpen = ref(false);

// const closeWishList = () => {
// 	wishListOpen.value = false;
// };

// const openWishList = () => {
// 	wishListOpen.value = true;
// };

// provide('wishs', {
// 	closeWishList,
// 	openWishList,
// });
</script>

<template>
	<header class="app-header fixed w-full z-50 bg-[#f4f4f4]/[0.25] backdrop-blur-md">
		<MegaMenu
			class="max-w-[1180px] mx-auto"
			:model="items"
		>
			<template #start>
				<div class="">
					<img
						class="w-19 cursor-pointer"
						src="https://static.tildacdn.com/tild3231-6432-4035-b065-626135383237/01.svg"
						alt=""
						@click="router.push('/')"
					/>
				</div>
			</template>

			<template #item="{ item }">
				<nuxt-link
					:to="item.link"
					v-if="item.root"
					class="flex items-center px-3 py-2 cursor-pointer overflow-hidden relative uppercase text-[--text-color] text-sm"
				>
					<span :class="item.icon" />
					<span class="">{{ item.label }}</span>
				</nuxt-link>

				<div
					v-else-if="!item.image"
					class="flex items-center p-2 cursor-pointer gap-1 text-[--text-color]"
				>
					<nuxt-link
						:to="item.link"
						class="inline-flex flex-column gap-1"
					>
						<span class=" ">{{ item.label }} </span>
					</nuxt-link>
				</div>
			</template>

			<template #end>
				<div class="flex gap-6 items-center">
					<i class="pi pi-heart text-2xl cursor-pointer"></i>
					<!-- <favorite v-if="wishListOpen" /> -->
					<ClientOnly>
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
							@click="isAuthModalOpen = true"
							:class="!isAuthenticated ? 'pi pi-sign-in ' : 'pi pi-user'"
							class="text-2xl cursor-pointer"
						></i>
					</ClientOnly>
				</div>
			</template>
		</MegaMenu>
	</header>

	<Dialog
		v-model:visible="isAuthModalOpen"
		modal
		header="Login"
		:style="{ width: '25rem' }"
	>
		<nuxt-link :to="config.public.api + 'auth/yandex'">
			<Button
				type="submit"
				label="Sign In with Yandex"
				icon="pi pi-user"
				class="w-full mt-4"
			></Button>
		</nuxt-link>
	</Dialog>
</template>

<style lang="scss">
.app-header {
	.p-megamenu {
		justify-content: space-between;
		align-items: center;
		background: inherit;
		border: none;
		text-transform: uppercase;
		font-weight: 300;
		&-root-list {
			margin-left: auto;
			gap: 16px;
		}
		.p-menuitem:nth-child(1) {
			padding-top: 1.5px;
		}
		.p-megamenu-panel {
			top: 60px;
		}
		&-end {
			margin-left: 32px;
		}
	}
}
</style>
