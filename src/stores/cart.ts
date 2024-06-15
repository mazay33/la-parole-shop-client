import type { ICartItems } from '~/repository/Cart/cart.types'
import { cartRepository } from '~/repository/Cart/CartRepository'
import { productRepository } from '~/repository/Product/productRepository'
import type { IProduct } from '~/repository/Product/types.product'

export const useCartStore = defineStore('cart', () => {
  const productStore = useProductStore()
  const { product } = storeToRefs(productStore)
  const cart = ref<ICartItems | null>()
  const cartTotal = ref<{ count: number }>()

  const getCartItems: () => Promise<void> = async () => {
    const { data, refresh, error, pending } = await cartRepository.getAll()

    if (data.value) {
      cart.value = data.value
    }

    if (error.value?.statusCode === 401) {
      if (process.client) {
        console.log(111111);

        getCartItemsLocalStorage()
      } else {
        return
      }
    }
  }

  const getCartItemsLocalStorage = () => {
    if (localStorage.getItem('cart')) {
      cart.value = JSON.parse(localStorage.getItem('cart') || '[]')
    }
  }

  const getCartTotal: () => Promise<void> = async () => {
    const { data, refresh, error, pending } =
      await cartRepository.getCartTotal()

    if (data.value) {
      cartTotal.value = data.value
    } else if (error.value?.statusCode === 401) {
      if (process.client) {
        cartTotal.value = {
          count: JSON.parse(localStorage.getItem('cart')!)?.length || 0,
        }
      } else {
        return
      }
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

    if (error.value?.statusCode === 401) {
      if (process.client) {
        addProductToCartLocalStorage()
        getCartTotal()
      } else {
        return
      }
    }
  }

  const addProductToCartLocalStorage = () => {
    if (product.value) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')

      const existedProduct = cart.find(
        (cartItem: ICartItems) => cartItem.product.id === product.value?.id
      )

      if (!existedProduct) {
        cart.push({ count: 1, product: product.value })
      }

      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }

  const deleteAllProductsFromCart = async () => {
    const { data, refresh, error, pending } =
      await cartRepository.deleteAllProductsFromCart()

    if (data.value) {
      await getCartItems()
      await getCartTotal()
    }

    if (error.value?.statusCode === 401) {
      if (process.client) {
        deleteAllProductsFromCartLocalStorage()
        await getCartItems()
        await getCartTotal()
      } else {
        return
      }
    }
  }

  const deleteAllProductsFromCartLocalStorage = async () => {


    localStorage.setItem('cart', JSON.stringify([]))
  }

  return {
    getCartItems,
    getCartTotal,
    addProductToCart,
    deleteAllProductsFromCart,

    cart,
    cartTotal: computed(() => cartTotal.value),
  }
})
