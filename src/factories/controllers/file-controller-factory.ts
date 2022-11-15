import { CreateFile } from '../../domain/use-cases/create-file'
import { DeleteFile } from '../../domain/use-cases/delete-file'
import { RenameFile } from '../../domain/use-cases/rename-file'
import { UserHasFolderPermission } from '../../domain/use-cases/user-has-folder-permission'
import { FileController } from '../../infra/http/express/controllers/file-controller'

export function createFileController(
  userHasFolderPermission: UserHasFolderPermission,
  createFile: CreateFile,
  renameFile: RenameFile,
  deleteFile: DeleteFile
) {
  return new FileController(userHasFolderPermission, createFile, renameFile, deleteFile)
}
