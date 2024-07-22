<script setup lang="ts">
import useApiService from '~/services/apiService';

const name = defineModel('modelName');
const sortBy = defineModel<string>('modelSortBy');
const sortType = defineModel<string>('modelSortType');
const emit = defineEmits(['update:categoryId']);
const props = defineProps<{ categoryId: string | undefined }>();

const apiService = useApiService();

const sortOptions = [
	{ label: 'По умолчанию', type: '', value: '' },
	{ label: 'Дешевле', type: 'asc', value: 'price' },
	{ label: 'Дороже', type: 'desc', value: 'price' },
	{ label: 'Скидки', type: 'desc', value: 'discount' },
	{ label: 'Новинки', type: 'desc', value: 'createdAt' },
	{ label: 'По названию (A-Z)', type: 'asc', value: 'name' },
	{ label: 'По названию (Z-A)', type: 'desc', value: 'name' },
];
const selectedSortOption = ref(sortOptions[0]);

watchEffect(() => {
	sortBy.value = selectedSortOption.value?.value;
	sortType.value = selectedSortOption.value?.type;
});

const { data: categories } = await apiService.category.getCategories();
</script>

<template>
	<div>
		<!-- <div class="mb-20 relative">
			<img
				src="@/assets/images/catalog.png"
				alt=""
			/>
			<h2 class="absolute left-36 bottom-4 text-white text-38 font-300 font-['Cormorant_Garamond']">КАТАЛОГ</h2>
		</div> -->
		<div class="mb-20 flex flex-col gap-10">
			<div class="flex items-center gap-8 justify-end uppercase">
				<template v-if="categories">
					<div
						class="cursor-pointer"
						:class="!+props.categoryId! ? 'text-[--primary-color]' : 'text-gray-400'"
						@click="emit('update:categoryId', undefined)"
					>
						Все
					</div>
					<div
						@click="emit('update:categoryId', category.id)"
						v-for="category in categories"
						:key="category.id"
						class="cursor-pointer"
						:class="+props.categoryId! === category.id ? 'text-[--primary-color]' : 'text-gray-500'"
					>
						{{ category.name }}
					</div>
				</template>
			</div>

			<div class="flex justify-between items-center">
				<div>
					<Dropdown
						class="min-w-[180px]"
						placeholder="Раздел"
					/>
				</div>
				<div class="flex gap-5">
					<InputGroup>
						<InputText
							v-model="name"
							placeholder="Поиск"
						/>
						<Button icon="pi pi-search" />
					</InputGroup>
					<Dropdown
						class="min-w-[180px]"
						:options="sortOptions"
						option-label="label"
						placeholder="Cортировка"
						v-model="selectedSortOption"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
