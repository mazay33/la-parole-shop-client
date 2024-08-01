<script setup lang="ts">
const complects = ref([
	{
		label: 'Базовые комплекты',
		img: 'https://static.tildacdn.com/tild6431-3831-4537-b739-646537653634/IMG_9795-2-min.jpg',
		link: { path: '/product/catalog', query: { categoryId: 1, subCategoryId: 1 } },
	},
	{
		label: 'Эротическое',
		img: 'https://static.tildacdn.com/tild3633-3764-4138-a137-376131613332/IMG_6456-min.JPEG',
		link: '/product/catalog?categoryId=1&subCategoryId=7',
	},
	{
		label: 'Кружевное',
		img: 'https://static.tildacdn.com/tild6663-6133-4631-a166-653438323565/Frame_1171275579-min.jpg',
		link: '/product/catalog?categoryId=1&subCategoryId=3',
	},
	{
		label: 'Скидки',
		img: 'https://optim.tildacdn.com/tild6535-3666-4264-a437-313333653637/-/format/webp/IMG_9792-min.JPG',
		link: '/product/catalog?sortBy=discount&sortType=desc',
	},
]);
</script>

<template>
	<div class="flex flex-col gap-10">
		<h3 class="uppercase font-300">Комплекты</h3>
		<div class="grid grid-cols-2 gap-4">
			<nuxt-link
				class="relative group"
				:to="complect.link"
				v-for="complect in complects"
				:key="complect.label"
			>
				<img
					:src="complect.img"
					class="w-full h-[575px] object-c object-cover"
					alt=""
				/>
				<div
					class="text-center absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
				>
					<p class="text-white text-6xl font-[Cormorant_Garamond] uppercase">{{ complect.label }}</p>
				</div>
			</nuxt-link>
		</div>
	</div>
</template>

<style scoped></style>
