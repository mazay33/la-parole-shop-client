<template>
  <div class="flex gap-20">
    <div class="flex flex-col gap-3 w-300px">
      <div class="flex flex-col gap-2">
        <label for="name">Название товара</label>
        <InputText
          id="name"
          v-model="productName"
          aria-describedby="name-help"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="name">Цена</label>
        <InputGroup>
          <InputNumber v-model="productPrice" />
          <InputGroupAddon>₽</InputGroupAddon>
        </InputGroup>
      </div>
      <div v-if="categories" class="flex flex-col gap-2">
        <label for="name">Категория</label>
        <Dropdown
          v-model="selectedCategory"
          :options="categories"
          optionLabel="name"
          class="w-full"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="name">Подкатегория</label>
        <MultiSelect
          :disabled="!selectedCategory"
          v-model="selectedSubCategories"
          display="chip"
          :options="selectedCategory?.sub_categories"
          optionLabel="name"
          class="w-full"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="name">cupSizes</label>
        <MultiSelect
          :disabled="
            !selectedCategory ||
            (selectedCategory?.id !== 1 && selectedCategory?.id !== 2)
          "
          v-model="cupSizes"
          display="chip"
          :options="sizes?.cup_sizes"
          optionLabel="size"
          class="w-full"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="name">underbustSizes</label>
        <MultiSelect
          :disabled="
            !selectedCategory ||
            (selectedCategory?.id !== 1 && selectedCategory?.id !== 2)
          "
          v-model="underbustSizes"
          display="chip"
          :options="sizes?.underbust_sizes"
          optionLabel="size"
          class="w-full"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="name">clothingSizes</label>
        <MultiSelect
          :disabled="!selectedCategory || selectedCategory?.id == 2"
          v-model="clothingSizes"
          display="chip"
          :options="sizes?.clothing_sizes"
          optionLabel="size"
          class="w-full"
        />
      </div>
    </div>

    <div class="flex flex-col gap-3 w-300px">
      <p class="text-center">Вариации комплекта</p>

      <div class="flex flex-col gap-2">
        <label for="variation-name">Название вариации</label>
        <InputText
          id="variation-name"
          v-model="newVariation.name"
          aria-describedby="variation-name-help"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="variation-sku">SKU вариации</label>
        <InputText
          id="variation-sku"
          v-model="newVariation.sku"
          aria-describedby="variation-sku-help"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="variation-price">Цена вариации</label>
        <InputNumber
          id="variation-price"
          v-model="newVariation.price"
          aria-describedby="variation-price-help"
        />
      </div>
      <Button label="Добавить вариацию" @click="addVariation"></Button>

      <pre v-if="variations.length">{{ variations }}</pre>
    </div>
  </div>

  <div class="w-500px mt-8">
    <FileUpload
      name="demo[]"
      customUpload
      @uploader="addProduct"
      :multiple="true"
      accept="image/*"
      :maxFileSize="10000000"
    >
      <template #empty>
        <p>Выберите или переместите файлы здесь для загрузки</p>
      </template>
    </FileUpload>
  </div>
  <Toast />
</template>

<script setup lang="ts">
  import { productRepository } from '~/repository/Product/productRepository'
  import { sizesRepository } from '~/repository/Sizes/sizesRepository'
  import { categoryRepository } from '~/repository/Category/categoryRepository'
  import type { FileUploadUploaderEvent } from 'primevue/fileupload'
  import type {
    ICategory,
    ISubCategory,
  } from '@/repository/Category/categoryRepository'
  import type {
    IClothingSize,
    ICupSize,
    IUnderbustSize,
  } from '@/repository/Sizes/sizesRepository'
  import { useToast } from 'primevue/usetoast';
  definePageMeta({
    layout: 'admin',
  })

  const toast = useToast();

  const { data: categories } = await categoryRepository.getAllCategories()
  const { data: sizes } = await sizesRepository.getAllSizes()

  const productName = ref<string>('')
  const productPrice = ref<number>()
  const productImages = ref<File[]>()

  const selectedCategory = ref<ICategory>()
  const selectedSubCategories = ref<ISubCategory[]>()

  const cupSizes = ref<ICupSize[]>()
  const clothingSizes = ref<IClothingSize[]>()
  const underbustSizes = ref<IUnderbustSize[]>()

  const variations = ref<any>([])

  const newVariation = ref({
    name: '',
    sku: '',
    price: null,
  })

  const addVariation = () => {
    variations.value.push({ ...newVariation.value })

    newVariation.value = {
      name: '',
      sku: '',
      price: null,
    }
  }

  const addStringifyDataToFormData = (
    formData: FormData,
    key: string,
    value: any
  ) => {
    formData.append(key, JSON.stringify(value))
  }

  const addProduct = async (event: FileUploadUploaderEvent) => {
    const formData = new FormData()
    productImages.value = event.files as File[]

    formData.append('name', productName.value)
    formData.append('price', String(productPrice.value))
    formData.append('categoryId', String(selectedCategory.value?.id))

    addStringifyDataToFormData(formData, 'variation', variations.value)
    addStringifyDataToFormData(
      formData,
      'sub_categories',
      selectedSubCategories.value?.map((category) => category.id)
    )
    addStringifyDataToFormData(
      formData,
      'clothing_sizes',
      clothingSizes.value?.map((size) => size.id)
    )
    addStringifyDataToFormData(
      formData,
      'underbust_sizes',
      underbustSizes.value?.map((size) => size.id)
    )
    addStringifyDataToFormData(
      formData,
      'cup_sizes',
      cupSizes.value?.map((size) => size.id)
    )

    for (const image of productImages.value) {
      formData.append('images', image)
    }

    const { data, error } = await productRepository.createProduct(formData)

    if (error.value) {
      toast.add({ severity: 'error', summary: 'Ошибка в создании продукта', detail: error.value.data.message, life: 3000 });
    } else {
      toast.add({ severity: 'success', summary: 'Успешно', detail: `Продукт ${data.value?.name} создан`, life: 3000 });
    }
  }
</script>

<style scoped></style>
