<script setup lang="ts">
import useApiService from '~/services/apiService';

const config = useRuntimeConfig();
const apiService = useApiService();
const productId = useRoute().params.id as string;

const { data: product } = await apiService.product.getProductById(productId, {
	lazy: true,
});

const props = defineProps({
	imgNum: Number,
});

const emit = defineEmits(['update:imgNum']);
const localImgNum = ref(props.imgNum);

const updateImgNum = (i: number) => {
	localImgNum.value = i;
	emit('update:imgNum', i);
};
</script>

<template>
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
			@click="updateImgNum(i)"
		/>
	</div>
</template>
