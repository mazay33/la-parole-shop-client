import type { _AsyncData, KeysOf } from 'nuxt/dist/app/composables/asyncData'
import BaseRepository from '../baseRepository'
import type { UseFetchOptions } from 'nuxt/dist/app/composables'
import type { FetchError } from 'ofetch'
import { Omit } from '../types'

const authEndpoint = '/auth'

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  EMLOYEE = 'EMPLOYEE',
}

interface IAuthUser {
  id: number
  email: string
  password: string
  role: Role
  isActivated: boolean
  activationLink: string
  createdAt: Date
  updatedAt: Date
  cart: {
    userId: number
    createdAt: Date
    updatedAt: Date
  }
  profile: any
  address: string[]
  wishlist: {
    userId: number
    createdAt: Date
    updatedAt: Date
  }
}

interface IAuthLoginData {
  accessToken: string
  refreshToken: string
  user: IAuthUser
}

interface IAuthLoginPayload {
  email: string
  password: string
}

class AuthRepository extends Omit(BaseRepository<any, any>, ['create','delete','getAll','getById','update']) {
  constructor() {
    super(authEndpoint)
  }

  public async login(email: string, password: string) {
    return await this._handleRequest<IAuthLoginData, IAuthLoginPayload>(
      this._endpoint + '/login',
      'POST',
      {
        body: {
          email,
          password,
        },
      }
    )
  }


  public async refresh() {
    return await this._handleRequest<IAuthLoginData>(
      this._endpoint + '/refresh',
      'GET'
    )
  }

  public async getMe() {
    return await this._handleRequest<IAuthUser>(this._endpoint + '/me', 'GET')
  }

  public async logout() {
    return await this._handleRequest(this._endpoint + '/logout', 'POST')
  }
}

export const authRepo = new AuthRepository()
