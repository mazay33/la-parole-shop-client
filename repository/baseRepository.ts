import type { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
import { FetchError } from 'ofetch'
import httpService, { type IHttpService } from '~/services/httpService'

interface IBaseRepository<T> {
  // Сюда можно добавить другие методы для работы с API
}

class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected readonly _endpoint: string) {}

  protected async _handleRequest<T, U = any>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: U
  ): Promise<_AsyncData<T | null, FetchError<any> | null>> {
    try {
      const response: _AsyncData<T | null, FetchError<any> | null> = await (
        httpService as IHttpService
      )[method.toLowerCase()](url, data)
      return response
    } catch (error) {
      if (error instanceof FetchError) {
        console.error('Fetch error:', error.message)
      } else {
        console.error('Unexpected error:', error)
      }
      return error as _AsyncData<T | null, FetchError<any> | null>
    }
  }
}

export default BaseRepository
