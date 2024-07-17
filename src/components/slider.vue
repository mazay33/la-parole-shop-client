<script setup lang="ts">
import type { IProductImage } from '~/services/api/product/productApi.types';
import useApiService from '~/services/apiService';

const config = useRuntimeConfig();

const props = defineProps<{
	imgNum: number;
	images: IProductImage[];
}>();

const emit = defineEmits(['update:imgNum']);
const localImgNum = ref(props.imgNum);

const updateImgNum = (i: number) => {
	localImgNum.value = i;
	emit('update:imgNum', i);
};
</script>

<template>
	<div class="flex flex-wrap max-h-[140px] w-full h-full gap-1">
		<NuxtImg
			v-for="(img, i) in images"
			:key="i"
			:src="`${config.public.api.replace('/api/', '')}/uploads/${images[i]?.url}`"
			alt=""
			:class="[
				'w-16 h-20 transition-opacity object-cover object-center duration-400 ease-in-out hover:opacity-70 cursor-pointer',
				imgNum === i ? 'border-debug' : '',
			]"
			@click="updateImgNum(i)"
		/>
	</div>
</template>
