import { FolderController } from '../infra/http/express/controllers/folder-controller'
import { ApplicationRoutes } from '../infra/http/express/routes/application-routes'

export function createApplicationRoutes(folderController: FolderController) {
  return new ApplicationRoutes(folderController)
}
