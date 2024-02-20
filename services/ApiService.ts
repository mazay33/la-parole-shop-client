import { createFetch } from '@vueuse/core'

const networkFetchClient = createFetch({
  baseUrl: `${import.meta.env.VITE_API_URL}`,
  combination: 'chain',
  options: {
    beforeFetch({ options, url, cancel }) {
      options.headers = {
        ...options.headers,
      }
      // console.log(options, url, cancel);

      return { options }
    },
    afterFetch(ctx) {
      // if the response contains a data property, return it

      if (ctx.data) {
        return ctx.data
      }

      console.log(ctx);


      return ctx
    },
    onFetchError(ctx) {
      console.log(ctx);
      if(ctx?.response?.status === 401 ) {

        const authStore = useAuthStore()
        // authStore.refresh()

      }

      return ctx
    },
  },

  fetchOptions: {
    mode: 'cors',
    credentials: 'include',
  },
})

class ApiService {
  private networkClient: typeof networkFetchClient

  constructor(networkClient: typeof networkFetchClient) {
    this.networkClient = networkClient
  }

  public get<T>(url: string) {
    return this.networkClient(url, {
      afterFetch: (ctx) => ctx.data,
    })
      .get()
      .json<T>()
  }

  public post<T, U>(url: string, body: U, options?: any) {
    return this.networkClient(url, options ?? {}, {
      afterFetch: (ctx) => ctx.data,
    })
      .post(body)
      .json<T>()
  }

  public put<T, U>(url: string, body: U, options?: any) {
    return this.networkClient(url, options ?? {}, {
      afterFetch: (ctx) => ctx.data,
    })
      .put(body)
      .json<T>()
  }

  public delete<T>(url: string) {
    return this.networkClient(url, {
      afterFetch: (ctx) => ctx.data,
    })
      .delete()
      .json<T>()
  }
}

export const apiService = new ApiService(networkFetchClient)
