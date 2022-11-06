import { Router } from 'express'
import { FolderController } from '../controllers/folder-controller'

export class ApplicationRoutes {
  public route: Router
  constructor(
    public folderController: FolderController
  ) {
    this.route = Router()
    this.route.get('/folders', this.folderController.find.bind(folderController))
    this.route.post('/folders', this.folderController.create.bind(folderController))
  }
}
