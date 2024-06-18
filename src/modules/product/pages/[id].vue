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
const selectedCupSize = ref();

const underbust_sizes = product.value?.underbust_sizes.map(size => size.size) || [];
const selectedUnderbust_sizes = ref();

const clothing_sizes = product.value?.clothing_sizes.map(size => size.size) || [];
const selectedClothing_sizes = ref();
</script>

<template>
	<div>
		<div class="grid grid-cols-2 gap-10">
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
				<p>{{ product?.price.toLocaleString() }} ₽</p>

				<div v-if="product?.variations">
					<p>Комплектация</p>
					<div class="flex gap-2">
						<Button
							class="bg-white text-black border-black"
							v-for="variation in product?.variations"
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

				<div class="mt-10">
					<Button
						class="uppercase px-[30px] py-4 font-500 bg-black border-black hover:bg-red-300 hover:border-red-300 rounded-xl"
						>Добавить в корзину</Button
					>
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
			<div class="flex flex-wrap max-w-[560px] max-h-[140px] w-full h-full gap-1 mt--9">
				<NuxtImg
					v-for="(img, i) in product.img"
					:key="i"
					:src="`${config.public.api.replace('/api/', '')}/uploads/${product.img[i]?.url}`"
					alt=""
					:class="[
						'w-16 h-20 transition-opacity duration-400 ease-in-out hover:opacity-70 cursor-pointer',
						imgNum === i ? 'border-debug' : '',
					]"
					@click="imgNum = i"
				/>
			</div>
		</div>
		<pre mt-10>
			{{ product }}
		</pre
		>
	</div>
</template>

<style scoped>
.border-debug {
	border: 2px solid rgba(0, 0, 0, 0.2);
}
</style>
