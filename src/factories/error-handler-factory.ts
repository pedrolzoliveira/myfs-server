import { ErrorHandler } from '../infra/http/express/middlawares/error-handler'

export function createErrorHandler() {
  return new ErrorHandler()
}
