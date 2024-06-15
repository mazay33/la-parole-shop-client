import { productRepository } from '~/repository/Product/productRepository'
import type { IProduct } from '~/repository/Product/types.product'

export const useProductStore = defineStore('product', () => {
  const products = ref<IProduct[]>()
  const product = ref<IProduct | null>(null)

  const getProducts: () => Promise<void> = async () => {
    const { data, refresh, error, pending } = await productRepository.getAll<
      IProduct[]
    >()

    if (data.value) {
      products.value = data.value
    }
  }

  const getProduct: (id: number) => Promise<void> = async (id) => {
    const { data, refresh, error, pending } =
      await productRepository.getById<IProduct>(id)

    if (data.value) {
      product.value = data.value
    }
  }

  return {
    getProducts,
    getProduct,

    products,
    product,
  }
})
