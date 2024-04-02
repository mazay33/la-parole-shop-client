import type { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
import { FetchError } from 'ofetch'
import httpService, { type IHttpService } from '~/services/httpService'

interface IBaseRepository<T> {
  endpoint: string

  handleRequest<U>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any
  ): Promise<_AsyncData<U | null, FetchError<any> | null>>

    // Сюда можно добавить другие методы для работы с API
}

class BaseRepository<T> implements IBaseRepository<T> {
  constructor(public readonly endpoint: string) {}

  async handleRequest<U>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any
  ): Promise<_AsyncData<U | null, FetchError<any> | null>> {
    try {
      const response = await (httpService as IHttpService)[
        method.toLowerCase()
      ](url, data)
      return response
    } catch (error) {
      if (error instanceof FetchError) {
        console.error('Fetch error:', error.message)
      } else {
        console.error('Unexpected error:', error)
      }
      return error as _AsyncData<U | null, FetchError<any> | null>
    }
  }
}




export default BaseRepository
