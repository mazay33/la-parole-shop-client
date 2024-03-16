import { useAPI } from '~/composables/useAPI'

export const useProductStore = defineStore('product', () => {
  const products = ref()
  const product = ref()
  const loading = ref(false)


  const getProducts = async () => {
    loading.value = true
    try {
      const { data, error, pending } = await useAPI('/product', {
      })

      products.value = data

    } catch (error) {
      console.error(error)
    }
  }

  const getProductById = async (id: string) => {
    loading.value = true
    const { data, error, pending } = await useAPI(`/product/${id}`, {
      lazy: true,
      server: false,
    })

    if (data.value) {
      product.value = data
    }

    loading.value = pending.value
  }

  return {
    products,
    getProducts,
    loading,
    getProductById,
    product,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
