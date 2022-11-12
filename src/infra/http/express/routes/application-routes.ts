import { Router } from 'express'
import { FileRoutes } from './file-routes'
import { FolderRoutes } from './folder-routes'
import { UserRoutes } from './user-routes'

export class ApplicationRoutes {
  public route: Router
  constructor(
    public folderRoutes: FolderRoutes,
    public userRoutes: UserRoutes,
    public fileRoutes: FileRoutes
  ) {
    this.route = Router()
    this.route.use('/folders', this.folderRoutes.route.bind(folderRoutes))
    this.route.use('/users', this.userRoutes.route.bind(userRoutes))
    this.route.use('/files', this.fileRoutes.route.bind(fileRoutes))
  }
}
