import type { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
import type { FetchError } from 'ofetch'
import BaseRepository from '../baseRepository'
import type {
  IProduct,
  IProductsData,
  IProductRepository,
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
    return await this.handleRequest<IProductsData>(this.endpoint, 'GET')
  }

  public async getOneProduct(
    id: number
  ): Promise<_AsyncData<IProduct | null, FetchError<any> | null>> {
    return await this.handleRequest<IProduct>(this.endpoint + '/' + id, 'GET')
  }

  public async createProduct(
    product: IProduct
  ): Promise<_AsyncData<IProduct | null, FetchError<any> | null>> {
    return await this.handleRequest<IProduct>(this.endpoint, 'POST', product)
  }

  public async updateProduct(
    id: string,
    product: IProduct
  ): Promise<_AsyncData<IProduct | null, FetchError<any> | null>> {
    return await this.handleRequest<IProduct>(
      this.endpoint + '/' + id,
      'PUT',
      product
    )
  }

  public async deleteProduct(
    id: string
  ): Promise<_AsyncData<{ deleted: boolean } | null, FetchError<any> | null>> {
    return await this.handleRequest<{ deleted: boolean }>(
      this.endpoint + '/' + id,
      'DELETE'
    )
  }
}

export const productRepository = new ProductRepository()
