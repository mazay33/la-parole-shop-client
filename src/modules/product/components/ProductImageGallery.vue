<script setup lang="ts">
import type { IProductImage } from '~/services/api/product/productApi.types';

const config = useRuntimeConfig();

const props = defineProps<{
	images: IProductImage[];
}>();

const imgNum = ref(0);

const productImage = ref<HTMLImageElement | null>(null);
const imageContainer = ref<HTMLDivElement | null>(null);

const zoomEnabled = ref(true);
const isArrowsShown = ref(false);

const disableZoom = () => {
	if (!imageContainer.value || !productImage.value) return;
	zoomEnabled.value = false;
	productImage.value.style.transformOrigin = ``;
	productImage.value.style.transform = 'scale(1)';
};

const enableZoom = () => {
	if (!imageContainer.value || !productImage.value) return;
	zoomEnabled.value = true;
	productImage.value.style.transform = '';
};

const prevImage = () => {
	imgNum.value = (imgNum.value - 1 + props.images.length) % props.images.length;
};

const nextImage = () => {
	imgNum.value = (imgNum.value + 1) % props.images.length;
};

const handleMouseMove = (e: MouseEvent) => {
	if (!imageContainer.value || !productImage.value) return;
	isArrowsShown.value = true;

	const rect = imageContainer.value.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;

	const xPercent = (x / rect.width) * 100;
	const yPercent = (y / rect.height) * 100;

	productImage.value.style.transformOrigin = `${xPercent}% ${yPercent}%`;
};

const handleMouseLeave = () => {
	isArrowsShown.value = false;
};

onMounted(() => {
	if (imageContainer.value) {
		imageContainer.value.addEventListener('mousemove', handleMouseMove);
	}
});

onBeforeUnmount(() => {
	if (imageContainer.value) {
		imageContainer.value.removeEventListener('mousemove', handleMouseMove);
	}
});
</script>
<template>
	<div class="flex flex-col gap-1">
		<div
			class="image-container"
			ref="imageContainer"
			@mouseleave="handleMouseLeave"
		>
			<img
				:src="`${config.public.api.replace('/api/', '')}/uploads/${images[imgNum]?.url}`"
				alt=""
				class="product-image"
				ref="productImage"
			/>
			<div
				class="navigation-arrows"
				v-if="images.length > 1 && isArrowsShown"
			>
				<div
					class="arrow ml-2"
					@mouseenter="disableZoom"
					@mouseleave="enableZoom"
					@click="prevImage"
				>
					<i class="pi pi-angle-left text-2xl"></i>
				</div>
				<div
					class="arrow mr-2"
					@mouseenter="disableZoom"
					@mouseleave="enableZoom"
					@click="nextImage"
				>
					<i class="pi pi-angle-right text-2xl"></i>
				</div>
			</div>
		</div>

		<slider
			:images="images"
			v-model:imgNum="imgNum"
		/>
	</div>
</template>

<style scoped>
.image-container {
	width: 100%;
	height: 820px;
	overflow: hidden;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}

.product-image {
	width: 100%;
	height: auto;
	object-fit: cover;
	object-position: center;
	transition: transform 0.3s ease-in-out;
}

.image-container:hover .product-image {
	transform: scale(2.75);
	cursor: zoom-in;
}

.navigation-arrows {
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	pointer-events: none;
}

.arrow {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	background-color: rgba(0, 0, 0, 0.5);
	color: white;
	cursor: pointer;
	pointer-events: auto;
	transition: background-color 0.3s ease;
	border-radius: 100%;
}

.arrow:hover {
	background-color: rgba(0, 0, 0, 0.7);
}
</style>
