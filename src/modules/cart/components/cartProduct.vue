<script setup lang="ts">
import type { ICartProductItem } from '~/services/api/cart/cartApi.types';
const config = useRuntimeConfig();

const props = defineProps<{
	cartProduct: ICartProductItem;
}>();

const cartStore = useCartStore();

const op = ref();
const toggle = (event: any) => {
	op.value.toggle(event);
};
</script>

<template>
	<div class="flex items-center pt-3 font-['Raleway'] w-full gap-2%">
		<div class="flex items-center gap-4 w-59%">
			<div>
				<img
					v-if="cartProduct.product.images.length"
					class="w-20 h-20 object-cover rounded-lg"
					:src="`${config.public.api.replace('/api/', '')}/uploads/${props.cartProduct.product.images[0]?.url}`"
					alt=""
				/>
			</div>
			<div class="flex flex-col">
				<div class="mb-2">
					<p class="text-xl">{{ cartProduct.product.name }}</p>
				</div>

				<div class="flex flex-col justify-center items-start text-[##323232] text-[12px]">
					<p>Комплектация: {{ cartProduct.productConfiguration?.name }}</p>

					<p v-if="cartProduct.cupSizeId">Чашка бюста: {{ cartProduct.cupSize?.size }}</p>
					<p v-if="cartProduct.clothingSizeId">Трусики: {{ cartProduct.clothingSize?.size }}</p>
					<p v-if="cartProduct.beltSizeId">Пояс для чулок: {{ cartProduct.beltSize?.size }}</p>
					<p class="mt-2 font-medium">
						{{
							cartProduct.productConfiguration
								? cartProduct.productConfiguration.sku
								: cartProduct.product.sku
						}}
					</p>
				</div>
			</div>
		</div>

		<div class="flex items-center justify-end w-39%">
			<InputNumber
				class="cart-product-quantity-input mr-4"
				v-model="cartProduct.quantity"
				showButtons
				buttonLayout="horizontal"
				:min="1"
				:max="99"
			>
				<template #incrementbuttonicon>
					<span class="pi pi-plus" />
				</template>
				<template #decrementbuttonicon>
					<span class="pi pi-minus" />
				</template>
			</InputNumber>

			<p class="mx-4 min-w-4rem text-center text-nowrap">
				{{
					cartProduct.product.productConfigurations.length
						? cartProduct.productConfiguration!.price * cartProduct.quantity
						: cartProduct.product.price * cartProduct.quantity
				}}
				р.
			</p>
			<i
				@click="cartStore.deleteCartProduct(cartProduct.id)"
				class="pi pi-times-circle ml-4 cursor-pointer text-2xl text-gray-300 hover:text-gray-500 duration-200"
			></i>
		</div>
	</div>

	<div
		class="mt-4"
		@click="toggle"
	>
		<Button> <i class="pi pi-pencil mr-2"></i>Изменить размер</Button>
	</div>
	<OverlayPanel
		ref="op"
		appendTo="body"
		class="max-w-457px"
	>
		<div>
			<p class="mb-1">Бюстгальтер</p>
			<div class="flex items-center gap-4 flex-wrap">
				<Button
					@click="cartProduct.cupSizeId = size.id"
					:class="[
						cartProduct.cupSizeId === size.id
							? 'border-[#e4aa9f]  text-[#e4aa9f]'
							: ' border-gray-300 text-black',
					]"
					v-for="size in cartProduct.product?.cupSizes"
					:key="size.id"
					class="font-['Raleway'] h-2rem font-300 w-2rem sm:h-3rem sm:w-3rem border-1 border-solid rounded-md bg-white inline-flex justify-center items-center flex-shrink-0 cursor-pointer hover:bg-gray-100 transition-duration-150 transition-colors"
				>
					{{ size.size }}
				</Button>
			</div>

			<p class="mt-4 mb-1">Трусики</p>
			<div class="flex items-center gap-4 flex-wrap">
				<Button
					@click="cartProduct.clothingSizeId = size.id"
					:class="[
						cartProduct.clothingSizeId === size.id
							? 'border-[#e4aa9f]  text-[#e4aa9f]'
							: ' border-gray-300 text-black',
					]"
					v-for="size in cartProduct.product?.clothingSizes"
					:key="size.id"
					class="font-['Raleway'] h-2rem font-300 w-2rem sm:h-3rem sm:w-3rem border-1 border-solid rounded-md bg-white inline-flex justify-center items-center flex-shrink-0 cursor-pointer hover:bg-gray-100 transition-duration-150 transition-colors"
				>
					{{ size.size }}
				</Button>
			</div>

			<p
				v-if="cartProduct.productConfiguration?.name.includes('поясом')"
				class="mt-4 mb-1"
			>
				Пояс
			</p>
			<div class="flex items-center gap-4 flex-wrap">
				<Button
					v-if="cartProduct.productConfiguration?.name.includes('поясом')"
					@click="cartProduct.beltSizeId = size.id"
					:class="[
						cartProduct.beltSizeId === size.id
							? 'border-[#e4aa9f]  text-[#e4aa9f]'
							: ' border-gray-300 text-black',
					]"
					v-for="size in cartProduct.product?.beltSizes"
					:key="size.id"
					class="font-['Raleway'] h-2rem font-300 w-2rem sm:h-3rem sm:w-3rem border-1 border-solid rounded-md bg-white inline-flex justify-center items-center flex-shrink-0 cursor-pointer hover:bg-gray-100 transition-duration-150 transition-colors"
				>
					{{ size.size }}
				</Button>
			</div>
		</div>
	</OverlayPanel>
</template>

<style lang="scss">
.cart-product-quantity-input {
	input {
		@apply max-w-3rem text-center;
	}
}
</style>
