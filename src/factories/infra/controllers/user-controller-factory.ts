import { UserController } from '../../../infra/http/express/controllers/user-controller'
import { Factory } from '../../factory'
import { CreateUserFactory } from '../../application/use-cases/create-user-factory'
import { SignInFactory } from '../../application/use-cases/sign-in-factory'

export const UserControllerFactory: Factory<UserController> = {
  async create() {
    return new UserController(
      await CreateUserFactory.create(),
      await SignInFactory.create()
    )
  }
}
