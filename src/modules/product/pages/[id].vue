<script setup lang="ts">
import useApiService from '~/services/apiService';

const config = useRuntimeConfig();
const apiService = useApiService();
const productId = useRoute().params.id as string;

const { data: product } = await apiService.product.getProductById(productId, {
	lazy: true,
});

const imgNum = ref(0);

const cupSizes = product.value?.cup_sizes.map(size => size.size) || [];
const selectedCupSize = ref('A');

const underbust_sizes = product.value?.underbust_sizes.map(size => size.size) || [];
const selectedUnderbust_sizes = ref('70');

const clothing_sizes = product.value?.clothing_sizes.map(size => size.size) || [];
const selectedClothing_sizes = ref('XS');

const sku = ref(product.value?.sku);
const price = ref(product.value?.price);
const selectedVariation = ref(null);

const selectVariation = variation => {
	sku.value = variation.sku;
	price.value = variation.price;
	selectedVariation.value = variation.id;
};

const isFavorite = ref(false);
const toggleFavorite = () => {
	isFavorite.value = !isFavorite.value;
};
</script>

<template>
	<div>
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

				<p>Артикул: {{ sku }}</p>
				<p class="font-semibold text-xl">{{ price?.toLocaleString() }} ₽</p>

				<div v-if="product?.variations">
					<p>Комплектация</p>
					<div class="flex gap-2">
						<Button
							v-for="variation in product?.variations"
							:key="variation.id"
							:class="[
								'border-black font-light text-black',
								selectedVariation === variation.id
									? 'bg-red-200 border-black'
									: 'bg-white border-gray-300',
							]"
							@click="selectVariation(variation)"
						>
							{{ variation.name }}
						</Button>
					</div>
				</div>

				<div
					class="mt-8"
					v-if="product?.cup_sizes"
				>
					<p>Чашка бюста</p>
					<Dropdown
						:options="cupSizes"
						v-model="selectedCupSize"
						class="mt--3"
					></Dropdown>
				</div>

				<div
					class="mt-3"
					v-if="product?.underbust_sizes"
				>
					<p>Объем под грудью</p>
					<Dropdown
						:options="underbust_sizes"
						v-model="selectedUnderbust_sizes"
						class="mt--3"
					></Dropdown>
				</div>

				<div
					class="mt-3"
					v-if="product?.clothing_sizes"
				>
					<p>Трусики</p>
					<Dropdown
						:options="clothing_sizes"
						v-model="selectedClothing_sizes"
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
				<P class="mt-10"
					>Закажите
					<NuxtLink
						to="/poshiv"
						class="text-red-300"
						>пошив по индивидуальным меркам</NuxtLink
					>
					данного комплекта</P
				>
			</div>
			<slider v-model:imgNum="imgNum" />
		</div>
		<!-- <pre mt-10>
			{{ product }}
		</pre
		> -->
	</div>
</template>

<style scoped>
.border-debug {
	border: 2px solid rgba(0, 0, 0, 0.2);
}
</style>
