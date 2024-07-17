<script setup lang="ts">
import type { ICartProductItem } from '~/services/api/cart/cartApi.types';
import useApiService from '~/services/apiService';
const config = useRuntimeConfig();
const apiService = useApiService();
const props = defineProps<{
	cartProduct: ICartProductItem;
}>();

const cartStore = useCartStore();

const op = ref();
const toggle = (event: any) => {
	op.value.toggle(event);
};

const updateCartProduct = async () => {
	await apiService.cart.updateCartProduct(props.cartProduct.id, {
		quantity: props.cartProduct.quantity,
		beltSizeId: props.cartProduct.beltSizeId,
		cupSizeId: props.cartProduct.cupSizeId,
		clothingSizeId: props.cartProduct.clothingSizeId,
		productConfigurationId: props.cartProduct.productConfigurationId,
	});
	await cartStore.getCart();
};
</script>

<template>
	<div
		class="flex items-center mb-3 font-['Raleway'] w-full gap-2% after:content-[''] relative after:absolute after:w-[110%] after:h-[1px] after:bg-[#E5E5E5] after:-bottom-4.5 after:-left-4.5 after:last:hidden"
	>
		<div class="flex items-center gap-4 w-59%">
			<div>
				<img
					v-if="cartProduct.product.images.length"
					class="w-20 object-cover rounded-lg"
					:src="`${config.public.api.replace('/api/', '')}/uploads/${props.cartProduct.product.images[0]?.url}`"
					alt=""
				/>
			</div>
			<div class="flex flex-col">
				<div class="mb-1">
					<p class="text-xl">{{ cartProduct.product.name }}</p>
				</div>

				<div class="flex flex-col justify-center items-start text-[##323232] text-[12px]">
					<p class="leading-[1.5]">Комплектация: {{ cartProduct.productConfiguration?.name }}</p>

					<p
						class="leading-[1.5]"
						v-if="cartProduct.cupSizeId"
					>
						Чашка бюста: {{ cartProduct.cupSize?.size }}
					</p>
					<p
						class="leading-[1.5]"
						v-if="cartProduct.clothingSizeId"
					>
						Трусики: {{ cartProduct.clothingSize?.size }}
					</p>
					<p
						class="leading-[1.5]"
						v-if="cartProduct.beltSizeId"
					>
						Пояс для чулок: {{ cartProduct.beltSize?.size }}
					</p>
					<p class="font-medium leading-[1.5]">
						{{
							cartProduct.productConfiguration
								? cartProduct.productConfiguration.sku
								: cartProduct.product.sku
						}}
					</p>
					<div
						class=""
						@click="toggle"
					>
						<Button class="text-sm px-3 py-2 mt-2">
							<i class="pi pi-pencil mr-2"></i>Изменить размер</Button
						>
					</div>
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
				@click="updateCartProduct()"
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
		<OverlayPanel
			ref="op"
			appendTo="body"
			class="max-w-457px"
		>
			<div>
				<p class="mb-1">Бюстгальтер</p>
				<div class="flex items-center gap-4 flex-wrap">
					<Button
						@click="(cartProduct.cupSizeId = size.id), updateCartProduct()"
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
						@click="(cartProduct.clothingSizeId = size.id), updateCartProduct()"
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
						@click="(cartProduct.beltSizeId = size.id), updateCartProduct()"
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
	</div>
</template>

<style lang="scss">
.cart-product-quantity-input {
	input {
		@apply max-w-3rem text-center;
	}
}
</style>
