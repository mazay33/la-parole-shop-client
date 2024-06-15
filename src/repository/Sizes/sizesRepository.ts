import type { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
import type { FetchError } from 'ofetch'
import BaseRepository from '../baseRepository'

export interface IClothingSize {
  id: number
  size: 'XS' | 'S' | 'M' | 'L'
}

export interface IUnderbustSize {
  id: number
  size: 'A' | 'B' | 'C' | 'D'
}

export interface ICupSize {
  id: number
  size: '70' | '75' | '80' | '85'
}

export interface ISizes {
  clothing_sizes: IClothingSize[]
  underbust_sizes: IUnderbustSize[]
  cup_sizes: ICupSize[]
}

interface ISizesRepository {
  getAllSizes(): Promise<_AsyncData<ISizes | null, FetchError<any> | null>>
}

const sizesEndpoint = '/sizes'

class SizesRepository
  extends BaseRepository<ISizes>
  implements ISizesRepository
{
  constructor() {
    super(sizesEndpoint)
  }

  public async getAllSizes(): Promise<
    _AsyncData<ISizes | null, FetchError<any> | null>
  > {
    return await this._handleRequest<ISizes>(this._endpoint, 'GET')
  }
}

export const sizesRepository = new SizesRepository()
