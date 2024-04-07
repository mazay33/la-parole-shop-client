import type { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
import { FetchError } from 'ofetch'
import httpService, { type IHttpService } from '~/services/httpService'
import type { UseFetchOptions } from 'nuxt/app'

class BaseRepository<Res, Data> {
  constructor(protected readonly _endpoint: string) {}

  protected async _handleRequest<T, U = any>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    { body = undefined, ...options }: UseFetchOptions<T> = {}
  ): Promise<_AsyncData<T | null, FetchError<any> | null>> {
    try {
      console.log({ body, options })

      const response: _AsyncData<T | null, FetchError<any> | null> = await (
        httpService as IHttpService
      )[method.toLowerCase()](url, body, options)
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

  public async getAll<T = Res>(
    options: UseFetchOptions<T> = {}
  ): Promise<_AsyncData<T | null, FetchError<any> | null>> {
    console.log(options)

    return await this._handleRequest<T>(this._endpoint, 'GET', options)
  }

  public async getById<T = Res>(id: number, options: UseFetchOptions<T> = {}) {
    return await this._handleRequest<T>(
      this._endpoint + '/' + id,
      'GET',
      options
    )
  }

  public async create<T = Res, U = Data>(
    data: U extends globalThis.Ref<
      Record<string, any> | BodyInit | null | undefined
    >
      ? U
      : Record<string, any>,
    options: UseFetchOptions<T> = {}
  ) {
    return await this._handleRequest<T, U>(this._endpoint, 'POST', {
      body: data,
      ...options,
    })
  }

  public async update<T = Res, U = Data>(
    id: number,
    data: U extends globalThis.Ref<
      Record<string, any> | BodyInit | null | undefined
    >
      ? U
      : Record<string, any>,
    options: UseFetchOptions<T> = {}
  ) {
    return await this._handleRequest<T, U>(this._endpoint + '/' + id, 'PUT', {
      body: data,
      ...options,
    })
  }

  public async delete<T = Res>(id: number, options: UseFetchOptions<T> = {}) {
    return await this._handleRequest<T>(
      this._endpoint + '/' + id,
      'DELETE',
      options
    )
  }
}

export default BaseRepository
