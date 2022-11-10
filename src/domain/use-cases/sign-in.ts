import { FindUserRepository } from '../../data/find-user-repository'
import { User } from '../model/user'

export interface SignInData {
  email: string
}

export interface SignIn {
  findUserRepository: FindUserRepository
  exec: (data: SignInData) => Promise<User | null>
}
