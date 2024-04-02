import type { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
import type { FetchError } from 'ofetch'
import type { IHttpService } from '~/services/httpService'
import httpService from '~/services/httpService'
import BaseRepository from './baseRepository'

interface IProduct {
  id: number
  name: string
  img?: string[] // Optional
  sku: string
  price: number
  discount: number
  stock: number
  isAvailable: boolean
  categoryId: number
  createdAt: Date
  updatedAt: Date
  category?: {
    // Optional category
    name: string
  }
  sub_categories?: string[] | undefined // Optional
  cup_sizes?: string[] | undefined // Optional
  clothing_sizes?: string[] | undefined // Optional
  underbust_sizes?: string[] | undefined // Optional
  variations?: IProductVariation[] | undefined // Optional
  info?: IProductInfo[] | undefined // Optional
}

interface IProductsData {
  data: IProduct[]
  totalCount: number
}

interface IProductVariation {
  id: number
  productId: number
  sku: string
  price: number
  name: string
}

interface IProductInfo {
  id: number
  title: string
  description: string
  productId: number
  createdAt: Date
  updatedAt: Date
}

const productEndpoint = '/product'

class ProductRepository extends BaseRepository<IProduct> {
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
