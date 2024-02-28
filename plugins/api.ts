export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  let isRefreshing = false

  const $api = $fetch.create({
    baseURL: 'https://la-parole.ru/api/',
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
              await fetchWithCookie(event!, `https://la-parole.ru/api/auth/refresh`)
          )

          console.log('DATAAAA',data.value);
          console.log('STATUUS',status.value);


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
