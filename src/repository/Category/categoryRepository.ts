import type { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
import type { FetchError } from 'ofetch'
import BaseRepository from '../baseRepository'

export interface ISubCategory {
  id: number
  categoryId: number
  name: string
  description: string | null
  createdAt: Date
  updatedAt: Date
}
export interface ICategory {
  id: number
  name: string
  description: string | null
  sub_categories: ISubCategory[]
  createdAt: Date
  updatedAt: Date
}

interface ICategoryRepository {
  getAllCategories(): Promise<
    _AsyncData<ICategory[] | null, FetchError<any> | null>
  >
}

const categoryEndpoint = '/category'

class CategoryRepository
  extends BaseRepository<ICategory[]>
  implements ICategoryRepository
{
  constructor() {
    super(categoryEndpoint)
  }

  public async getAllCategories(): Promise<
    _AsyncData<ICategory[] | null, FetchError<any> | null>
  > {
    return await this._handleRequest<ICategory[]>(this._endpoint, 'GET')
  }
}

export const categoryRepository = new CategoryRepository()
