<script setup lang="ts">
import type { IConfiguration, IProduct } from '~/services/api/product/productApi.types';

const props = defineProps<{
	product: IProduct;
}>();

const selectedCupSize = ref<number | null>(null);
const selectedBeltSize = ref<number | null>(null);
const selectedClothingSize = ref<number | null>(null);
const selectedConfiguration = ref<IConfiguration | null>(null);

// Выбор первого размера по умолчанию
watchEffect(() => {
	if (props.product) {
		if (props.product.cupSizes.length) selectedCupSize.value = props.product.cupSizes[0].id;
		if (props.product.clothingSizes.length) selectedClothingSize.value = props.product.clothingSizes[0]?.id;
		if (props.product.productConfigurations.length)
			selectedConfiguration.value = props.product.productConfigurations[0];
		if (props.product.beltSizes.length) selectedBeltSize.value = props.product.beltSizes[0].id;
	}
});

const isAddToCartDisabled = computed(() => {
	if (!props.product) return true;
	if (!selectedClothingSize.value && !selectedCupSize.value) return true;
	if (props.product.productConfigurations.length && !selectedConfiguration.value) return true;
	if (selectedConfiguration.value?.id !== props.product.productConfigurations[0]?.id && !selectedBeltSize.value)
		return true;
	return false;
});

const buttonClass = ref('');

const selectConfiguration = (configuration: IConfiguration) => {
	if (!props.product) return;
	props.product.sku = configuration.sku;
	props.product.price = configuration.price;
	selectedConfiguration.value = configuration;
};

const addToCart = async () => {
	if (!props.product) return;

	if (
		props.product.productConfigurations &&
		selectedConfiguration.value?.id === props.product.productConfigurations[0].id
	) {
		selectedBeltSize.value = null;
	}

	await useCartStore().addProductToCart(props.product, {
		beltSizeId: selectedBeltSize.value ?? null,
		clothingSizeId: selectedClothingSize.value ?? null,
		productConfigurationId: selectedConfiguration.value?.id ?? null,
		cupSizeId: selectedCupSize.value ?? null,
		quantity: 1,
	});
	buttonClass.value = 'add-to-cart-animation';
	setTimeout(() => {
		buttonClass.value = '';
	}, 500);
};
</script>

<template>
	<div class="flex flex-col justify-start mx-5">
		<h4 class="text-[20px] font-bold">{{ product?.name }}</h4>

		<p class="mb-2">Артикул: {{ product?.sku }}</p>
		<p class="text-[20px] mb-2">{{ product?.price.toLocaleString() }} ₽</p>

		<div v-if="product?.productConfigurations.length">
			<p class="mb-2">Комплектация</p>
			<div class="flex gap-2">
				<Button
					@click="selectConfiguration(configuration)"
					v-for="configuration in product?.productConfigurations"
					:key="configuration.id"
					:class="[
						'font-light  hover:bg-gray-100 ',
						selectedConfiguration?.id === configuration.id
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
					selectedCupSize === size.id ? 'border-[#e4aa9f]  text-[#e4aa9f]' : ' border-gray-300 text-black',
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
			v-if="selectedConfiguration?.name.includes('поясом')"
			class="mt-4 mb-1"
		>
			Пояс
		</p>
		<div class="flex items-center gap-4 flex-wrap w-90%">
			<Button
				v-if="selectedConfiguration?.name.includes('поясом')"
				@click="selectedBeltSize = size.id"
				:class="[
					selectedBeltSize === size.id ? 'border-[#e4aa9f]  text-[#e4aa9f]' : ' border-gray-300 text-black',
				]"
				v-for="size in product?.beltSizes"
				:key="size.id"
				class="font-['Raleway'] h-2rem font-300 w-2rem sm:h-3rem sm:w-3rem border-1 border-solid rounded-md bg-white inline-flex justify-center items-center flex-shrink-0 cursor-pointer hover:bg-gray-100 transition-duration-150 transition-colors"
			>
				{{ size.size }}
			</Button>
			<div v-if="selectedConfiguration?.name.includes('С поясом и гартерами')">
				<p m-0>Гартеры:</p>
				<p font-300>Соответствует размеру трусиков*</p>
			</div>
		</div>

		<div class="mt-10 flex">
			<Button
				:disabled="isAddToCartDisabled"
				@click="addToCart()"
				:class="buttonClass"
				class="uppercase px-[30px] py-4 font-500 bg-black border-black hover:bg-[#e4aa9f] hover:border-[#e4aa9f] rounded-xl"
				>Добавить в корзину</Button
			>
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
		<div class="pt-10">
			Комплект из графитового кружева с перламутровой цветочной вышивкой. Бюстгальтер балконет на косточках с
			мягкой чашкой, регулируемые бретели, застежка на крючки. Трусики бразильяно регулируемые по бокам. Пояс
			возможно носить как с чулками, так и с гартерами.
		</div>
	</div>
</template>

<style scoped></style>
