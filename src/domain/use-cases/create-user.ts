import { User } from '../model/user'

export interface CreateUserData {
  name: string
  email: string
}

export interface CreateUser {
  exec: (data: CreateUserData) => Promise<User>
}
