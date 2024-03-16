export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  let isRefreshing = false

  const $api = $fetch.create({
    baseURL: 'http://localhost:5000/api/',
    retry: 1,
    retryStatusCodes: [401],
    credentials: 'include',
    headers: useRequestHeaders(['cookie']),
    async onRequest({ request, options, error }) {
      options.headers = {
        ...options.headers,
        ...useRequestHeaders(['cookie']),
      }
    },

    async onResponseError({ response, options, error }) {
      if (response.status == 401 && !isRefreshing) {
        const authStore = useAuthStore()
        const { refresh, logout } = authStore

        isRefreshing = true

        if (process.server) {
          const event = useRequestEvent()

          const {data, status } = await useAsyncData(
            async () =>
              await fetchWithCookie(event!, `http://localhost:5000/api/auth/refresh`)
          )

          if (status.value === 'success') {
            await navigateTo(event.path)
            return
          } else {
            await navigateTo('/auth/login')
            await logout()
          }

          isRefreshing = false
        }
        if (process.client) {
          await refresh()

          isRefreshing = false
        }
      }
    },
  })
  // Expose to useNuxtApp().$api
  return {
    provide: {
      api: $api,
    },
  }
})
