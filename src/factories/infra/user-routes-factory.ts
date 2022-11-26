import { UserRoutes } from '../../infra/http/express/routes/user-routes'
import { UserControllerFactory } from './controllers/user-controller-factory'
import { Factory } from '../factory'
import { SchemaValidatorFactory } from './schema-validator-factory'
import { AuthenticatorFactory } from './authenticator-factory'

export const UserRoutesFactory: Factory<UserRoutes> = {
  async create() {
    return new UserRoutes(
      await SchemaValidatorFactory.create(),
      await AuthenticatorFactory.create(),
      await UserControllerFactory.create()
    )
  }
}
