import { Router } from 'express'
import { FolderController } from '../controllers/folder-controller'

export class FolderRoutes {
  public route: Router
  constructor(
    public folderController: FolderController
  ) {
    this.route = Router()
    this.route.get('/', this.folderController.find.bind(folderController))
    this.route.post('/', this.folderController.create.bind(folderController))
  }
}
