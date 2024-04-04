import type { UseFetchOptions } from 'nuxt/app'
import type {
  _AsyncData,
  KeysOf,
  PickFrom,
} from 'nuxt/dist/app/composables/asyncData'
import type { FetchError } from 'ofetch'

export interface IHttpService {
  get<T>(
    url: string
  ): Promise<_AsyncData<PickFrom<T, KeysOf<T>> | null, FetchError<any> | null>>
  post<T, U>(
    url: string,
    body: U extends globalThis.Ref<
      Record<string, any> | BodyInit | null | undefined
    >
      ? U
      : Record<string, any>,
    options?: UseFetchOptions<T>
  ): Promise<_AsyncData<PickFrom<T, KeysOf<T>> | null, FetchError<any> | null>>
  put<T, U>(
    url: string,
    body: U extends globalThis.Ref<
      Record<string, any> | BodyInit | null | undefined
    >
      ? U
      : Record<string, any>,
    options?: UseFetchOptions<T>
  ): Promise<_AsyncData<PickFrom<T, KeysOf<T>> | null, FetchError<any> | null>>
  delete<T>(
    url: string
  ): Promise<_AsyncData<PickFrom<T, KeysOf<T>> | null, FetchError<any> | null>>

  [key: string]: any
}

class HttpService implements IHttpService {
  private async _request<T>(url: string, options: UseFetchOptions<T> = {}) {
    try {
      const response = await useAPI<T>(url, options)

      if (response.error.value) {
        console.error('Error', response.error.value?.message)
      }

      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  public get<T>(
    url: string
  ): Promise<
    _AsyncData<PickFrom<T, KeysOf<T>> | null, FetchError<any> | null>
  > {
    return this._request<T>(url)
  }

  public post<T, U>(
    url: string,
    body: U extends globalThis.Ref<
      Record<string, any> | BodyInit | null | undefined
    >
      ? U
      : Record<string, any>,
    options: UseFetchOptions<T> = {}
  ) {
    return this._request<T>(url, {
      method: 'POST',
      body,
      ...options,
    })
  }

  public put<T, U>(
    url: string,
    body: U extends globalThis.Ref<
      Record<string, any> | BodyInit | null | undefined
    >
      ? U
      : Record<string, any>,
    options: UseFetchOptions<T> = {}
  ) {
    return this._request<T>(url, {
      method: 'PUT',
      body,
      ...options,
    })
  }

  public delete<T>(url: string) {
    return this._request<T>(url, {
      method: 'DELETE',
    })
  }
}

export default new HttpService()
