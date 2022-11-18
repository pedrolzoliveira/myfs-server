import { ApplicationRoutes } from '../../infra/http/express/routes/application-routes'
import { Factory } from '../factory'
import { FileRoutesFactory } from './file-routes-factory'
import { FolderRoutesFactory } from './folder-routes-factory'
import { UserRoutesFactory } from './user-routes-factory'

export const ApplicationRoutesFactory: Factory<ApplicationRoutes> = {
  async create() {
    return new ApplicationRoutes(
      await FolderRoutesFactory.create(),
      await UserRoutesFactory.create(),
      await FileRoutesFactory.create()
    )
  }
}
