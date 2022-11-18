import { ErrorHandler } from '../../infra/http/express/middlawares/error-handler'
import { Factory } from '../factory'

export const ErrorHandlerFactory: Factory<ErrorHandler> = {
  async create() {
    return new ErrorHandler()
  }
}
