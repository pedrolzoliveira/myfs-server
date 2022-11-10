import { User } from '../model/user'

export interface SignInData {
  email: string
}

export interface SignIn {
  exec: (data: SignInData) => Promise<User | null>
}
