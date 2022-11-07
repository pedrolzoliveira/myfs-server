import { CreateUser } from '../domain/use-cases/create-user'
import { UserController } from '../infra/http/express/controllers/user-controller'

export function createUserController(createUser: CreateUser) {
  return new UserController(createUser)
}
