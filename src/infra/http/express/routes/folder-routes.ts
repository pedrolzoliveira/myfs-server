import { Router } from 'express'
import { FolderController } from '../controllers/folder-controller'
import { Authenticator } from '../middlawares/authenticator'
import { SchemaValidator } from '../middlawares/schema-validator'
import { FolderCreateSchema } from '../request-schemas/folder-create-schema'
import { FolderUpdateSchema } from '../request-schemas/folder-update-schema'

export class FolderRoutes {
  public route: Router
  constructor(
    private readonly schemaValidator: SchemaValidator,
    private readonly authenticator: Authenticator,
    public folderController: FolderController
  ) {
    this.route = Router()
    this.route.get('/',
      this.authenticator.handle,
      this.folderController.find.bind(folderController)
    )

    this.route.post('/',
      this.authenticator.handle,
      this.schemaValidator.handle(FolderCreateSchema),
      this.folderController.create.bind(folderController)
    )

    this.route.put('/',
      this.authenticator.handle,
      this.schemaValidator.handle(FolderUpdateSchema),
      this.folderController.update.bind(folderController)
    )
  }
}
