import { CreateUser } from '../domain/use-cases/create-user'
import { SignIn } from '../domain/use-cases/sign-in'
import { UserController } from '../infra/http/express/controllers/user-controller'

export function createUserController(createUser: CreateUser, signIn: SignIn) {
  return new UserController(createUser, signIn)
}
