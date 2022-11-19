import { Server } from '../../infra/http/express/server'
import { ErrorHandlerFactory } from './error-handler-factory'
import { ApplicationRoutesFactory } from './application-routes-factory'
import { Factory } from '../factory'
import { SessionFactory } from './session-factory'

export const ServerFactory: Factory<Server> = {
  async create() {
    const applicationRoutes = await ApplicationRoutesFactory.create()
    return new Server(
      applicationRoutes.route,
      await ErrorHandlerFactory.create(),
      await SessionFactory.create()
    )
  }
}
