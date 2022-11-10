import { User } from '../domain/model/user'

export interface FindUserData {
  id?: string
  email?: string
}

export interface FindUserRepository {
  find: (data: FindUserData) => Promise<User | null>
}
