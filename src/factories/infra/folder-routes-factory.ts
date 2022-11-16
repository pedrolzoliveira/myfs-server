import { FolderRoutes } from '../../infra/http/express/routes/folder-routes'
import { AuthenticatorFactory } from './authenticator-factory'
import { FolderControllerFactory } from './controllers/folder-controller-factory'
import { Factory } from '../factory'
import { SchemaValidatorFactory } from './schema-validator-factory'

export const FolderRoutesFactory: Factory<FolderRoutes> = {
  async create() {
    return new FolderRoutes(
      await SchemaValidatorFactory.create(),
      await AuthenticatorFactory.create(),
      await FolderControllerFactory.create()
    )
  }
}
