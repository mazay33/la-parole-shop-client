import type { _AsyncData, KeysOf } from 'nuxt/dist/app/composables/asyncData'
import BaseRepository from '../baseRepository'
import type { IProduct } from './types.product'
import type { UseFetchOptions } from 'nuxt/dist/app/composables'
import type { FetchError } from 'ofetch'

const productEndpoint = '/product'

/**
 * Generates a new class based on the input class with specified keys omitted.
 *
 * @param {new (_endpoint: string) => T} Class - The input class to derive from.
 * @param {K[]} keys - The keys to omit from the new class.
 * @return {new (_endpoint: string) => Omit<T, (typeof keys)[number]>} The new class with specified keys omitted.
 */
const Omit = <T, K extends keyof T>(
  Class: new (_endpoint: string) => T,
  keys: K[]
): new (_endpoint: string) => Omit<T, (typeof keys)[number]> => Class

class ProductRepository extends Omit(BaseRepository<IProduct, FormData>, []) {
  constructor() {
    super(productEndpoint)
  }
}

export const productRepository = new ProductRepository()

