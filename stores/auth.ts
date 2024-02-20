import { useAPI } from '~/composables/useAPI'
import { fetchWithCookie } from '~/composables/useFetchCookie'

type Tokens = {
  access_token: string
  refresh_token: string
  type: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    authenticated: false,
    users: null,
  }),

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      const { data, error, pending } = await useAPI('/auth/login', {
        method: 'POST',
        body: {
          email,
          password,
        },
      })

      if (data.value) {
        this.authenticated = true
      }

      this.loading = pending.value

      if (error.value) {
        console.error(error.value)
      }
    },

    async getUsers() {
      this.loading = true
      const { data, error, pending } = await useAPI('/auth/users', {})

      console.log(data)

      this.users = data

      console.log(this.users)

      this.loading = pending.value

      if (error.value) {
        console.error(error.value)
      }
    },

    async refresh() {
      this.loading = true

      const { data, error, pending } = await useAPI('/auth/refresh', {})

      console.log(error)

      if(error.value) {
        await this.logout()
      }

      // await this.logout()

      this.loading = pending.value
    },

    async logout() {
      this.loading = true
      const { data, error, pending } = await useAPI('/auth/logout', {
        method: 'POST',
      })

      this.authenticated = false
      useRouter().push('/auth/login')

      this.loading = pending.value
    },
  },
})

// export const useAuthStore = defineStore('auth', () => {
//   const loading = ref(false)
//   const authenticated = ref(false)
//   const refreshingToken = ref(false)
//   const users = ref()

//   const setUsers = (data?: any) => (users.value = data)

//   const login = async (email: string, password: string) => {
//     loading.value = true
//     const { data, pending } = await useAPI('/auth/login', {
//       method: 'POST',
//       body: {
//         email,
//         password,
//       },
//     })

//     if (data.value) {
//       authenticated.value = true
//     }

//     loading.value = pending.value
//   }

//   const getUsers = async () => {
//     loading.value = true
//     const { data, error, pending } = await useAPI('/auth/users', {
//       server: false,
//     })

//     await setUsers(data.value)

//     loading.value = pending.value
//   }

//   const refresh = async () => {
//     loading.value = true
//     const { data, error, pending } = await useAPI('/auth/refresh', {
//       retry: 0,
//     })

//     loading.value = pending.value
//   }

// const logout = async () => {
//   loading.value = true
//   const { data, error, pending } = await useAPI('/auth/logout', {
//     method: 'POST',
//   })

//   authenticated.value = false
//   useRouter().push('/auth/login')

//   loading.value = pending.value
// }

//   return {
//     login,
//     loading,
//     logout,
//     getUsers,
//     refresh,
//     refreshingToken,
//     authenticated,
//     users
//   }
// })
