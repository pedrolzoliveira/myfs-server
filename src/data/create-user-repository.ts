import { User } from '../domain/model/user'

export interface CreateUserData {
  name: string
  email: string
}

export interface CreateUserRepository {
  createUser: (data: CreateUserData) => Promise<User>
}
