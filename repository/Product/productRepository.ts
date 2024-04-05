import type { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
import type { FetchError } from 'ofetch'
import type { UseFetchOptions } from 'nuxt/app'
import BaseRepository from '../baseRepository'
import type {
  IProduct,
  IProductsData,
  IProductRepository,
  IProductCreateDataForm,
} from './types.product'

const productEndpoint = '/product'

class ProductRepository
  extends BaseRepository<IProduct>
  implements IProductRepository
{
  constructor() {
    super(productEndpoint)
  }

  public async getAllProducts(): Promise<
    _AsyncData<IProductsData | null, FetchError<any> | null>
  > {
    return await this._handleRequest<IProductsData>(this._endpoint, 'GET')
  }

  public async getOneProduct(
    id: number
  ): Promise<_AsyncData<IProduct | null, FetchError<any> | null>> {
    return await this._handleRequest<IProduct>(this._endpoint + '/' + id, 'GET')
  }

  public async createProduct(
    product: FormData
  ): Promise<_AsyncData<IProduct | null, FetchError<any> | null>> {
    return await this._handleRequest<IProduct, FormData>(
      this._endpoint,
      'POST',
      {
        body: product,
      }
    )
  }

  public async updateProduct(
    id: string,
    product: IProduct
  ): Promise<_AsyncData<IProduct | null, FetchError<any> | null>> {
    return await this._handleRequest<IProduct>(
      this._endpoint + '/' + id,
      'PUT',
      {
        body: product,
      }
    )
  }

  public async deleteProduct(
    id: string
  ): Promise<_AsyncData<{ deleted: boolean } | null, FetchError<any> | null>> {
    return await this._handleRequest<{ deleted: boolean }>(
      this._endpoint + '/' + id,
      'DELETE'
    )
  }
}

export const productRepository = new ProductRepository()
