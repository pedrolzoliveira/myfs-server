import { FileRoutes } from '../../infra/http/express/routes/file-routes'
import { AuthenticatorFactory } from './authenticator-factory'
import { FileControllerFactory } from './controllers/file-controller-factory'
import { Factory } from '../factory'
import { SchemaValidatorFactory } from './schema-validator-factory'
import { UploadHandlerFactory } from './upload-handler-factory'

export const FileRoutesFactory: Factory<FileRoutes> = {
  async create() {
    return new FileRoutes(
      await SchemaValidatorFactory.create(),
      await AuthenticatorFactory.create(),
      await FileControllerFactory.create(),
      await UploadHandlerFactory.create()
    )
  }
}
