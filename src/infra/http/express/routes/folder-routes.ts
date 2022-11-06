import { Router } from 'express'
import { FolderController } from '../controllers/folder-controller'
import { SchemaValidator } from '../middlawares/schema-validator'
import { FolderCreateSchema } from '../request-schemas/folder-create-schema'
export class FolderRoutes {
  public route: Router
  constructor(
    private readonly schemaValidator: SchemaValidator,
    public folderController: FolderController
  ) {
    this.route = Router()
    this.route.get('/', this.folderController.find.bind(folderController))
    this.route.post('/', this.schemaValidator.handle(FolderCreateSchema), this.folderController.create.bind(folderController))
  }
}
