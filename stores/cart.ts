import type { ICartItems } from '~/repository/Cart/cart.types'
import { cartRepository } from '~/repository/Cart/CartRepository'
import { productRepository } from '~/repository/Product/productRepository'

export const useCartStore = defineStore('cart', () => {
  const productStore = useProductStore()
  const { product } = storeToRefs(productStore)
  const cart = ref<ICartItems | null>()
  const cartTotal = ref<{ count: number }>()

  const getCartItems: () => Promise<void> = async () => {
    const { data, refresh, error, pending } = await cartRepository.getAll()

    if (data.value) {
      cart.value = data.value
    } else {
      if (process.client) {
        getCartItemsLocalStorage()
      } else {
        return
      }
    }
  }

  const getCartItemsLocalStorage = () => {
    if (localStorage.getItem('cart')) {
      cart.value = JSON.parse(localStorage.getItem('cart')!)
    }
  }

  const getCartTotal: () => Promise<void> = async () => {
    const { data, refresh, error, pending } =
      await cartRepository.getCartTotal()

    if (data.value) {
      cartTotal.value = data.value
    }
  }

  const addProductToCart = async (count: number, productId: number) => {
    const { data, refresh, error, pending } = await productRepository.addToCart(
      count,
      productId
    )
    if (data.value) {
      await getCartTotal()
    }

    if (error.value?.statusCode == 401) {
      if (process.client) {
        localStorage.setItem('cart', JSON.stringify(product.value))
      } else {
        return
      }
    }
  }

  const deleteAllProductsFromCart = async () => {
    const { data, refresh, error, pending } =
      await cartRepository.deleteAllProductsFromCart()

    if (data.value) {
      await getCartItems()
      await getCartTotal()
    }
  }

  return {
    getCartItems,
    getCartTotal,
    addProductToCart,
    deleteAllProductsFromCart,

    cart,
    cartTotal,
  }
})
