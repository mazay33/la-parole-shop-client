<script setup lang="ts">
import type { IVariation } from '~/services/api/product/productApi.types';
import useApiService from '~/services/apiService';

const config = useRuntimeConfig();
const apiService = useApiService();
const productId = useRoute().params.id;

const { data: product } = await apiService.product.getProductById(String(productId), { lazy: true });

const selectedCupSize = ref();
const selectedUnderbustSize = ref();
const selectedClothingSize = ref();

watchEffect(() => {
	selectedCupSize.value = product.value?.cup_sizes[0]?.id;
	selectedUnderbustSize.value = product.value?.underbust_sizes[0]?.id;
	selectedClothingSize.value = product.value?.clothing_sizes[0]?.id;
});

const imgNum = ref(0);

const selectedVariation = ref();

const selectVariation = (variation: IVariation) => {
	if (!product.value) return;
	product.value.sku = variation.sku;
	product.value.price = variation.price;
	selectedVariation.value = variation.id;
};

const isFavorite = ref(false);
const toggleFavorite = () => {
	isFavorite.value = !isFavorite.value;
};
</script>

<template>
	<div class="grid grid-cols-2 gap-10 font-['Raleway'] text-lg">
		<div
			class="flex max-w-[560px] max-h-[745px] w-full h-full"
			v-if="product"
		>
			<NuxtImg
				:src="`${config.public.api.replace('/api/', '')}/uploads/${product.img[imgNum]?.url}`"
				alt=""
				weight="560"
				height="745"
				class="transition-opacity duration-500 ease-in-out"
			/>
		</div>
		<div class="flex flex-col justify-start mx-5">
			<h4>{{ product?.name }}</h4>

			<p>Артикул: {{ product?.sku }}</p>
			<p class="font-semibold text-xl">{{ product?.price.toLocaleString() }} ₽</p>

			<div v-if="product?.variations.length">
				<p>Комплектация</p>
				<div class="flex gap-2">
					<Button
						@click="selectVariation(variation)"
						v-for="variation in product?.variations"
						:key="variation.id"
						:class="[
							'border-black font-light text-black',
							selectedVariation === variation.id ? 'bg-red-200 border-black' : 'bg-white border-gray-300',
						]"
					>
						{{ variation.name }}
					</Button>
				</div>
			</div>

			<div
				class="mt-8"
				v-if="product?.cup_sizes.length"
			>
				<p>Чашка бюста</p>
				<Dropdown
					optionLabel="size"
					optionValue="id"
					:options="product.cup_sizes"
					v-model="selectedCupSize"
					class="mt--3"
				></Dropdown>
			</div>

			<div
				class="mt-3"
				v-if="product?.underbust_sizes.length"
			>
				<p>Объем под грудью</p>
				<Dropdown
					optionLabel="size"
					optionValue="id"
					:options="product?.underbust_sizes"
					v-model="selectedUnderbustSize"
					class="mt--3"
				></Dropdown>
			</div>

			<div
				class="mt-3"
				v-if="product?.clothing_sizes.length"
			>
				<p>Трусики</p>
				<Dropdown
					optionLabel="size"
					optionValue="id"
					:options="product?.clothing_sizes"
					v-model="selectedClothingSize"
					class="mt--3"
				></Dropdown>
			</div>

			<div class="mt-10 flex">
				<Button
					class="uppercase px-[30px] py-4 font-500 bg-black border-black hover:bg-red-300 hover:border-red-300 rounded-xl"
					>Добавить в корзину</Button
				>
				<Button
					:class="[
						'ml-3 pr-2 text-black bg-white rounded-full border border-slate-300 hover:border-slate-400',
						isFavorite ? 'pi pi-heart-fill text-red-300' : 'pi pi-heart',
					]"
					style="font-size: 1.2rem"
					@click="toggleFavorite()"
				></Button>
			</div>
			<div class="mt-10">
				Закажите
				<NuxtLink
					to="/poshiv"
					class="text-red-300"
					>пошив по индивидуальным меркам</NuxtLink
				>
				данного комплекта
			</div>
		</div>
		<slider v-model:imgNum="imgNum" />
	</div>
</template>

<style scoped>
.border-debug {
	border: 2px solid rgba(0, 0, 0, 0.2);
}
</style>
