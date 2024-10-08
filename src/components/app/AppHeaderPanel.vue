<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import type { ICategory } from '~/services/api/category/categoryApi.types';
import type { ISubCategory } from '~/services/api/sub-category/subCategoryApi.types';

type MenuLink = {
	text: string;
	to: string;
};

type MenuItem = {
	mainLink: MenuLink;
	links: MenuLink[];
};

const emit = defineEmits(['@close']);

const categoryStore = useCategoryStore();
const { categories, subCategories } = storeToRefs(categoryStore);
const route = useRoute();

const generateMenu = (categories: ICategory[], subCategories: ISubCategory[]): MenuItem[] => {
	return categories.map(category => {
		const links = subCategories
			.filter(subCategory => subCategory.categoryId === category.id)
			.map(subCategory => ({
				text: subCategory.name,
				to: `/product/catalog?categoryId=${category.id}&subCategoryId=${subCategory.id}`,
			}));

		return {
			mainLink: {
				text: category.name,
				to: `/product/catalog?categoryId=${category.id}`,
			},
			links,
		};
	});
};

const menu = computed(() => {
	if (categories.value && subCategories.value) {
		return generateMenu(categories.value, subCategories.value);
	}
	return [];
});

const isActiveLink = (link: string): boolean => {
	return route.fullPath.includes(link);
};
</script>

<template>
	<div class="dropdown-menu">
		<div class="grid grid-cols-10 w-full">
			<div
				v-for="(category, index) in menu"
				:key="index"
				class="col-span-2 [&:nth-last-child(2)]:col-span-1"
			>
				<div class="flex flex-col gap-4">
					<ul class="list-none p-1 flex flex-col gap-2">
						<li
							@click="emit('@close')"
							:class="[
								'font-700 p-3 cursor-pointer',
								isActiveLink(category.mainLink.to) ? 'text-[--primary-color]' : '',
							]"
						>
							<nuxt-link :to="category.mainLink.to">{{ category.mainLink.text }}</nuxt-link>
						</li>
						<li
							@click="emit('@close')"
							v-for="(link, linkIndex) in category.links"
							:key="linkIndex"
							:class="[
								'link-item p-3 cursor-pointer',
								isActiveLink(link.to) ? 'text-[--primary-color]' : '',
							]"
						>
							<nuxt-link
								:class="isActiveLink(link.to) ? 'text-[--primary-color]' : 'link text-gray-500'"
								:to="link.to"
								>{{ link.text }}</nuxt-link
							>
						</li>
					</ul>
				</div>
			</div>

			<div class="p-4 px-8 col-span-3 overflow-y-auto h-30rem">
				<ul class="list-none p-0 m-0 hover:bg-white">
					<li @click="emit('@close')">
						<nuxt-link
							class="mt-5 sm:mt-0 mb-5 flex flex-col items-center image-hover"
							to="/product/catalog"
						>
							<img
								src="https://optim.tildacdn.com/stor3934-6562-4162-b830-383466646437/-/format/webp/55290263.jpg"
								alt="Image"
								class="w-full h-50 object-c object-cover rounded-xl"
							/><span
								class="inline-flex bg-white px-3 py-2 rounded -mt-5 font-medium text-[--primary-color]"
								>НОВИНКИ</span
							>
						</nuxt-link>
					</li>
					<li @click="emit('@close')">
						<nuxt-link
							class="mt-5 sm:mt-0 mb-5 flex flex-col items-center image-hover"
							to="/product/catalog"
						>
							<img
								src="https://static.tildacdn.com/tild6636-3534-4731-b336-383866636230/IMG_2579_Facetune_02.jpeg"
								alt="Image"
								class="w-full h-50 object-c object-cover rounded-xl"
							/><span
								class="inline-flex bg-white px-3 py-2 rounded -mt-5 font-medium text-[--primary-color]"
								>BESTSELLERS</span
							>
						</nuxt-link>
					</li>
					<li @click="emit('@close')">
						<nuxt-link
							class="mt-5 sm:mt-0 flex flex-col items-center image-hover"
							to="/product/catalog"
						>
							<img
								src="https://static.tildacdn.com/tild3633-3563-4766-a562-356535366437/IMG_2352.jpg"
								alt="Image"
								class="w-full h-50 object-c object-cover rounded-xl"
							/><span
								class="inline-flex bg-white px-3 py-2 rounded -mt-5 font-medium text-[--primary-color]"
								>СКИДКИ</span
							>
						</nuxt-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.image-hover {
	transition:
		transform 0.3s ease,
		box-shadow 0.3s ease;
}

.image-hover:hover {
	transform: scale(1.05);
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.link-item {
	&:hover .link {
		@apply text-[--primary-color] duration-200;
	}
}
.dropdown-menu {
	position: absolute;
	max-width: 1200px;
	width: 100%;
	display: flex;
	justify-content: center;
	margin-left: calc(-600px + 50%);
	left: 0;
	top: 84px;
	z-index: 1001;
	background: white;
	border: 1px solid #e2e8f0;
	box-shadow:
		0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -2px rgba(0, 0, 0, 0.1);
	border-radius: 6px;
	padding: 16px;
}
</style>
