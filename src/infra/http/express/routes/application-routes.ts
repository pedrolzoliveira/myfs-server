import { Router } from 'express'
import { FolderRoutes } from './folder-routes'

export class ApplicationRoutes {
  public route: Router
  constructor(
    public folderRoutes: FolderRoutes
  ) {
    this.route = Router()
    this.route.use('/folders', this.folderRoutes.route.bind(folderRoutes))
  }
}
