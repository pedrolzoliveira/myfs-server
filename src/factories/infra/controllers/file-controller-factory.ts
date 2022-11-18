import { FileController } from '../../../infra/http/express/controllers/file-controller'
import { Factory } from '../../factory'
import { CreateFileFactory } from '../../application/use-cases/create-file-factory'
import { PrepareDeleteFileFactory } from '../../application/use-cases/prepare-delete-file-factory'
import { RenameFileFactory } from '../../application/use-cases/rename-file-factory'
import { UserHasFolderPermissionFactory } from '../../application/use-cases/user-has-folder-permission-factory'
import { MoveFileFactory } from '../../application/use-cases/move-file-factory'

export const FileControllerFactory: Factory<FileController> = {
  async create() {
    return new FileController(
      await UserHasFolderPermissionFactory.create(),
      await CreateFileFactory.create(),
      await RenameFileFactory.create(),
      await PrepareDeleteFileFactory.create(),
      await MoveFileFactory.create()
    )
  }
}
