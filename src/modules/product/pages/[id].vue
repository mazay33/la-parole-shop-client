<script setup lang="ts">
import type { configure } from 'vee-validate';
import type { IConfiguration } from '~/services/api/product/productApi.types';
import useApiService from '~/services/apiService';

const config = useRuntimeConfig();
const apiService = useApiService();
const productId = useRoute().params.id;

const { data: product } = await apiService.product.getProductById(String(productId));

const selectedCupSize = ref<number | null>();
const selectedBeltSize = ref<number | null>();
const selectedClothingSize = ref<number | null>();
const selectedConiguration = ref<IConfiguration | null>();

watchEffect(() => {
	selectedCupSize.value = product.value?.cupSizes[0].id;
	selectedClothingSize.value = product.value?.clothingSizes[0]?.id;

	if (product.value?.productConfigurations.length) {
		selectedConiguration.value = product.value?.productConfigurations[0];
	}
});

const imgNum = ref(0);
const ff1 = ref(false);
const buttonClass = ref('');

const selectConfiguration = (configuration: IConfiguration) => {
	if (!product.value) return;
	product.value.sku = configuration.sku;
	product.value.price = configuration.price;
	selectedConiguration.value = configuration;
};

const selectedWish = (configuration: IConfiguration) => {
	if (!product.value) return;
	product.value.sku = configuration.sku;
	product.value.price = configuration.price;
	selectedConiguration.value = configuration;
};

//cartArr
// productId: product.value?.id,
// 	variationId: selectedVariation.value,
// 	cup: selectedCupSize.value,
// 	under: selectedUnderbustSize.value,
// 	clothing: selectedClothingSize.value,
// 	price: product.value?.price,

const addToWishList = async () => {
	buttonClass.value = 'add-to-cart-animation';
	setTimeout(() => {
		buttonClass.value = '';
	}, 500);
};

const addToCart = async () => {
	if (!product.value) return;

	await useCartStore().addProductToCart(product.value, {
		beltSizeId: selectedBeltSize.value ?? undefined,
		clothingSizeId: selectedClothingSize.value ?? undefined,
		configurataionId: selectedConiguration.value?.id ?? undefined,
		cupSizeId: selectedCupSize.value ?? undefined,
		quantity: 1,
	});

	// Trigger the animation
	buttonClass.value = 'add-to-cart-animation';
	setTimeout(() => {
		buttonClass.value = '';
	}, 500);
};
</script>

<template>
	<div class="grid grid-cols-2 gap-10 font-['Raleway'] text-lg">
		<div
			class="flex max-w-[560px] max-h-[745px] w-full h-full"
			v-if="product"
		>
			<NuxtImg
				:src="`${config.public.api.replace('/api/', '')}/uploads/${product.images[imgNum]?.url}`"
				alt=""
				weight="560"
				height="745"
				class="transition-opacity duration-500 ease-in-out"
			/>
		</div>
		<div class="flex flex-col justify-start mx-5">
			<h4 class="text-[20px] font-bold">{{ product?.name }}</h4>

			<p>Артикул: {{ product?.sku }}</p>
			<p class="text-[20px]">{{ product?.price.toLocaleString() }} ₽</p>

			<div v-if="product?.productConfigurations.length">
				<p>Комплектация</p>
				<div class="flex gap-2">
					<Button
						@click="selectConfiguration(configuration)"
						v-for="configuration in product?.productConfigurations"
						:key="configuration.id"
						:class="[
							'font-light  hover:bg-gray-100 ',
							selectedConiguration?.id === configuration.id
								? ' border-[#e4aa9f] bg-white text-[#e4aa9f]'
								: 'bg-white border-gray-300 text-black',
						]"
					>
						{{ configuration.name }}
					</Button>
				</div>
			</div>

			<p class="mt-8 mb-1">Бюстгальтер</p>
			<div class="flex items-center gap-4 flex-wrap w-90%">
				<Button
					@click="selectedCupSize = size.id"
					:class="[
						selectedCupSize === size.id
							? 'border-[#e4aa9f]  text-[#e4aa9f]'
							: ' border-gray-300 text-black',
					]"
					v-for="size in product?.cupSizes"
					:key="size.id"
					class="font-['Raleway'] h-2rem font-300 w-2rem sm:h-3rem sm:w-3rem border-1 border-solid rounded-md bg-white inline-flex justify-center items-center flex-shrink-0 cursor-pointer hover:bg-gray-100 transition-duration-150 transition-colors"
				>
					{{ size.size }}
				</Button>
			</div>

			<p class="mt-4 mb-1">Трусики</p>
			<div class="flex items-center gap-4 flex-wrap w-90%">
				<Button
					@click="selectedClothingSize = size.id"
					:class="[
						selectedClothingSize === size.id
							? 'border-[#e4aa9f]  text-[#e4aa9f]'
							: ' border-gray-300 text-black',
					]"
					v-for="size in product?.clothingSizes"
					:key="size.id"
					class="font-['Raleway'] h-2rem font-300 w-2rem sm:h-3rem sm:w-3rem border-1 border-solid rounded-md bg-white inline-flex justify-center items-center flex-shrink-0 cursor-pointer hover:bg-gray-100 transition-duration-150 transition-colors"
				>
					{{ size.size }}
				</Button>
			</div>

			<p
				v-if="selectedConiguration?.name.includes('поясом')"
				class="mt-4 mb-1"
			>
				Пояс
			</p>
			<div class="flex items-center gap-4 flex-wrap w-90%">
				<Button
					v-if="selectedConiguration?.name.includes('поясом')"
					@click="selectedBeltSize = size.id"
					:class="[
						selectedBeltSize === size.id
							? 'border-[#e4aa9f]  text-[#e4aa9f]'
							: ' border-gray-300 text-black',
					]"
					v-for="size in product?.beltSizes"
					:key="size.id"
					class="font-['Raleway'] h-2rem font-300 w-2rem sm:h-3rem sm:w-3rem border-1 border-solid rounded-md bg-white inline-flex justify-center items-center flex-shrink-0 cursor-pointer hover:bg-gray-100 transition-duration-150 transition-colors"
				>
					{{ size.size }}
				</Button>
				<div v-if="selectedConiguration?.name.includes('С поясом и гартерами')">
					<p m-0>Гартеры:</p>
					<p font-300>Соответствует размеру трусиков*</p>
				</div>
			</div>

			<div class="mt-10 flex">
				<Button
					@click="addToCart()"
					:class="buttonClass"
					class="uppercase px-[30px] py-4 font-500 bg-black border-black hover:bg-[#e4aa9f] hover:border-[#e4aa9f] rounded-xl"
					>Добавить в корзину</Button
				>
				<!-- <likes
					:cartArr="cartArr"
					@click="addToWishList()"
				/> -->
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
		<slider
			v-if="product?.images.length"
			:images="product?.images"
			v-model:imgNum="imgNum"
		/>
	</div>
</template>

<style scoped>
.border-debug {
	border: 2px solid rgba(0, 0, 0, 0.2);
}

@keyframes add-to-cart {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
	100% {
		transform: scale(1);
	}
}

.add-to-cart-animation {
	animation: add-to-cart 0.5s ease-in-out;
}
</style>
