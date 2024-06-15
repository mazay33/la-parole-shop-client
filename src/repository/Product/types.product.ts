import type { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
import type { FetchError } from 'ofetch'

export interface IProduct {
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

export interface IProductsData {
  data: IProduct[]
  totalCount: number
}

export interface IProductVariation {
  id: number
  productId: number
  sku: string
  price: number
  name: string
}

export interface IProductCreateVariation {
  sku: string
  price: number
  name: string
}

export interface IProductInfo {
  id: number
  title: string
  description: string
  productId: number
  createdAt: Date
  updatedAt: Date
}

export interface IProductCreateInfo {
  title: string
  description: string
}

export interface IProductCreateDataForm {
  name: string
  price: number
  categoryId: number
  images: File
  variation: IProductCreateVariation[]
  info: IProductCreateInfo[]
  sub_categories?: string[]
  cup_sizes?: string[]
  clothing_sizes?: string[]
  underbust_sizes?: string[]
}

export interface IProductRepository {
  /**
   * Fetches all product data from the backend.
   *
   * @returns A promise that resolves to an `_AsyncData` object containing either:
   *   - `data`: An array of `IProduct` objects representing product data.
   *   - `totalCount`: The total number of products available (if provided by the backend).
   *   - `error`: A `FetchError` object in case of a network or data fetching error (null if successful).
   */
  getAllProducts(): Promise<
    _AsyncData<IProductsData | null, FetchError<any> | null>
  >

  /**
   * Fetches a single product by its ID from the backend.
   *
   * @param id The ID of the product to retrieve.
   *
   * @returns A promise that resolves to an `_AsyncData` object containing either:
   *   - `data`: An `IProduct` object representing the retrieved product data (null if not found).
   *   - `error`: A `FetchError` object in case of a network or data fetching error (null if successful).
   */
  getOneProduct(
    id: number
  ): Promise<_AsyncData<IProduct | null, FetchError<any> | null>>

  /**
   * Creates a new product on the backend.
   *
   * @param product An `IProduct` object containing the new product data.
   *
   * @returns A promise that resolves to an `_AsyncData` object containing either:
   *   - `data`: An `IProduct` object representing the newly created product (null if creation failed).
   *   - `error`: A `FetchError` object in case of a network or data creation error (null if successful).
   */
  createProduct(
    product: FormData
  ): Promise<_AsyncData<IProduct | null, FetchError<any> | null>>

  /**
   * Updates an existing product on the backend.
   *
   * @param id The ID of the product to update.
   * @param product An `IProductCreateDataForm` object containing the updated product data.
   *
   * @returns A promise that resolves to an `_AsyncData` object containing either:
   *   - `data`: An `IProductCreateDataForm` object representing the updated product (null if update failed).
   *   - `error`: A `FetchError` object in case of a network or data update error (null if successful).
   */
  updateProduct(
    id: string,
    product: IProduct
  ): Promise<_AsyncData<IProduct | null, FetchError<any> | null>>

  /**
   * Deletes a product from the backend.
   *
   * @param id The ID of the product to delete.
   *
   * @returns A promise that resolves to an `_AsyncData` object containing either:
   *   - `data`: An object with a `deleted` property indicating success (true) or failure (false).
   *   - `error`: A `FetchError` object in case of a network or data deletion error (null if successful).
   */
  deleteProduct(
    id: string
  ): Promise<_AsyncData<{ deleted: boolean } | null, FetchError<any> | null>>
}
