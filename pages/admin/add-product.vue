<template>
  <div class="flex flex-col gap-3 w-300px">
    <div class="flex flex-col gap-2">
      <label for="name">Название товара</label>
      <InputText id="name" v-model="productName" aria-describedby="name-help" />
    </div>

    <div class="flex flex-col gap-2">
      <label for="name">Цена</label>
      <InputGroup>
        <InputNumber v-model="productPrice" />
        <InputGroupAddon>₽</InputGroupAddon>
      </InputGroup>
    </div>
    <div class="flex flex-col gap-2">
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
      <Dropdown
        :disabled="!selectedCategory"
        v-model="selectedSubCategory"
        :options="selectedCategory?.sub_categories"
        optionLabel="name"
        class="w-full"
      />
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
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'admin',
  })
  const toast = useToast()

  const { data: categories } = await useAPI('/category')

  const productName = ref('')
  const productPrice = ref()
  const productImages = ref([])

  const selectedCategory = ref()
  const selectedSubCategory = ref()

  const addProduct = async (event) => {
    productImages.value = event.files
    let formData = new FormData()
    formData.append('name', productName.value)
    formData.append('price', productPrice.value)
    formData.append('categoryId', selectedCategory.value.id)
    formData.append('subCategoryId', selectedSubCategory.value.id)
    productImages.value.forEach((image) => {
      formData.append('images', image)
    })
    try {
      const { data } = await useAPI('/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })

    } catch (error) {}
  }
</script>

<style scoped></style>
