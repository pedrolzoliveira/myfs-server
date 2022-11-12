import { CreateFile } from '../../domain/use-cases/create-file'
import { UserHasFolderPermission } from '../../domain/use-cases/user-has-folder-permission'
import { FileController } from '../../infra/http/express/controllers/file-controller'

export function createFileController(userHasFolderPermission: UserHasFolderPermission, createFile: CreateFile) {
  return new FileController(userHasFolderPermission, createFile)
}
