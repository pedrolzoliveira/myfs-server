import { CreateFile } from '../../domain/use-cases/create-file'
import { PrepareDeleteFile } from '../../domain/use-cases/prepare-delete-file'
import { RenameFile } from '../../domain/use-cases/rename-file'
import { UserHasFolderPermission } from '../../domain/use-cases/user-has-folder-permission'
import { FileController } from '../../infra/http/express/controllers/file-controller'

export function createFileController(
  userHasFolderPermission: UserHasFolderPermission,
  createFile: CreateFile,
  renameFile: RenameFile,
  prepareDeleteFile: PrepareDeleteFile
) {
  return new FileController(userHasFolderPermission, createFile, renameFile, prepareDeleteFile)
}
