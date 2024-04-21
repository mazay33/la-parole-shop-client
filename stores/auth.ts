import { useAPI } from '~/composables/useAPI'
import { fetchWithCookie } from '~/composables/useFetchCookie'
import { authRepo } from '~/repository/Auth/AuthRepository'
import log from '~/server/middleware/log'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const isLoading = ref(false)
    const authenticated = ref(false)
    const user = ref()

    const login = async (email: string, password: string) => {
      isLoading.value = true
      const { data, error, pending } = await authRepo.login(email, password)
      if (data.value) {
        authenticated.value = true
        await getMe()
      }

      isLoading.value = pending.value
    }

    const refresh = async () => {
      const { data, error, pending } = await authRepo.refresh()
      if (data.value) {
        user.value = data.value
      }
      isLoading.value = pending.value
    }

    const logout = async () => {
      if (authenticated) {
        await authRepo.logout()
      }
      authenticated.value = false
      user.value = null
    }

    const getMe = async () => {
      const { data, error, pending } = await authRepo.getMe()
      if (data.value) {
        user.value = data.value
        authenticated.value = true
        console.log(user.value)
      } else {
        await logout()
      }
    }

    return {
      login,
      refresh,
      getMe,
      user,
      authenticated: computed(() => {
        return !!user.value
      }),
      isLoading: computed(() => isLoading.value),
    }
  },

  {
    persist: {
      storage: persistedState.cookiesWithOptions({
        sameSite: 'strict',
        secure: true,
      }),
    },
  }
)
