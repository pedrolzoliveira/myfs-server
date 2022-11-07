import { Router } from 'express'
import { FolderRoutes } from './folder-routes'
import { UserRoutes } from './user-routes'

export class ApplicationRoutes {
  public route: Router
  constructor(
    public folderRoutes: FolderRoutes,
    public userRoutes: UserRoutes
  ) {
    this.route = Router()
    this.route.use('/folders', this.folderRoutes.route.bind(folderRoutes))
    this.route.use('/users', this.userRoutes.route.bind(userRoutes))
  }
}
