import { Router } from 'express'
import { FileController } from '../controllers/file-controller'
import { Authenticator } from '../middlawares/authenticator'
import { SchemaValidator } from '../middlawares/schema-validator'
import { UploadHandler } from '../middlawares/upload-handler'
import { MoveFileSchema } from '../request-schemas/move-file-schema'
import { UpdateFileSchema } from '../request-schemas/update-file-schema'
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

    this.route.put(
      '/',
      this.schemaValidator.handle(UpdateFileSchema),
      this.authenticator.handle,
      this.fileController.update.bind(fileController)
    )

    this.route.delete(
      '/',
      this.schemaValidator.handle({ id: { isString: true, in: 'body', errorMessage: 'id is required' } }),
      this.authenticator.handle,
      this.fileController.delete.bind(fileController)
    )

    this.route.post(
      '/upload',
      this.schemaValidator.handle(UploadFile),
      this.authenticator.handle,
      this.fileController.checkPermission.bind(fileController),
      this.uploadHandler.handle(),
      this.uploadHandler.validateRequest,
      this.fileController.create.bind(fileController)
    )

    this.route.put(
      '/move',
      this.schemaValidator.handle(MoveFileSchema),
      this.authenticator.handle,
      this.fileController.move.bind(fileController)
    )
  }
}
