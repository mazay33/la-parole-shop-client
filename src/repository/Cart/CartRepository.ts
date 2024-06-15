import type { _AsyncData, KeysOf } from 'nuxt/dist/app/composables/asyncData'
import BaseRepository from '../baseRepository'
import type { UseFetchOptions } from 'nuxt/dist/app/composables'
import type { FetchError } from 'ofetch'
import { Omit } from '../types'
import type { ICartItems } from './cart.types'

const cartEndpoint = '/cart'

class CartRepository extends Omit(BaseRepository<ICartItems, any>, []) {
  constructor() {
    super(cartEndpoint)
  }

  public async getCartTotal() {
    return await this._handleRequest<{ count: number }>(
      this._endpoint + '/count',
      'GET'
    )
  }

  public async deleteAllProductsFromCart() {
    return await this._handleRequest<{ deleted: boolean }>(
      this._endpoint + '/delete-all',
      'DELETE'
    )
  }
}

export const cartRepository = new CartRepository()
