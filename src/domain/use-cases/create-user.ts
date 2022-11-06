import { CreateUserRepository } from '../../data/create-user-repository'
import { User } from '../model/user'

export interface CreateUserData {
  name: string
  email: string
}

export interface CreateUser {
  createUserRepository: CreateUserRepository
  exec: (data: CreateUserData) => Promise<User>
}
