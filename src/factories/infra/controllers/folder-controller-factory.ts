import { FolderController } from '../../../infra/http/express/controllers/folder-controller'
import { Factory } from '../../factory'
import { CreateFolderFactory } from '../../application/use-cases/create-folder-factory'
import { GetFolderFactory } from '../../application/use-cases/get-folder-factory'
import { RenameFolderFactory } from '../../application/use-cases/rename-folder-factory'
import { DeleteFolderFactory } from '../../application/use-cases/delete-folder-factory'
import { MoveFolderFactory } from '../../application/use-cases/move-folder-factory'

export const FolderControllerFactory: Factory<FolderController> = {
  async create() {
    return new FolderController(
      await CreateFolderFactory.create(),
      await GetFolderFactory.create(),
      await RenameFolderFactory.create(),
      await DeleteFolderFactory.create(),
      await MoveFolderFactory.create()
    )
  }
}
