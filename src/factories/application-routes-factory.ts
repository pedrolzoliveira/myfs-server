import { FolderController } from '../infra/http/express/controllers/folder-controller'
import { ApplicationRoutes } from '../infra/http/express/routes/application-routes'
import { FolderRoutes } from '../infra/http/express/routes/folder-routes'

export function createApplicationRoutes(folderController: FolderController) {
  const folderRoutes = new FolderRoutes(folderController)
  return new ApplicationRoutes(folderRoutes)
}
