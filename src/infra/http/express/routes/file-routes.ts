import { Router } from 'express'
import { FileController } from '../controllers/file-controller'
import { Authenticator } from '../middlawares/authenticator'
import { SchemaValidator } from '../middlawares/schema-validator'
import { UploadHandler } from '../middlawares/upload-handler'
import { UploadFile } from '../request-schemas/upload-file-schema'

export class FileRoutes {
  public route: Router
  constructor(
    private readonly schemaValidator: SchemaValidator,
    private readonly authenticator: Authenticator,
    private readonly fileController: FileController,
    private readonly uploadHandler: UploadHandler
  ) {
    this.route = Router()
    this.route.post(
      '/upload',
      this.schemaValidator.handle(UploadFile),
      this.authenticator.handle,
      this.fileController.checkPermission.bind(fileController),
      this.uploadHandler.handle(),
      this.fileController.create.bind(fileController)
    )
  }
}
