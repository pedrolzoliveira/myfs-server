import { FolderController } from '../infra/http/express/controllers/folder-controller'
import { UserController } from '../infra/http/express/controllers/user-controller'
import { Authenticator } from '../infra/http/express/middlawares/authenticator'
import { ApplicationRoutes } from '../infra/http/express/routes/application-routes'
import { FolderRoutes } from '../infra/http/express/routes/folder-routes'
import { UserRoutes } from '../infra/http/express/routes/user-routes'
import { createSchemaValidator } from './schema-validator-factory'

export function createApplicationRoutes(authenticator: Authenticator, folderController: FolderController, userController: UserController) {
  const schemaValidor = createSchemaValidator()

  const folderRoutes = new FolderRoutes(schemaValidor, authenticator, folderController)
  const userRoutes = new UserRoutes(schemaValidor, userController)

  return new ApplicationRoutes(folderRoutes, userRoutes)
}
