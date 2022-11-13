import { CreateFolder } from '../../domain/use-cases/create-folder'
import { GetFolder } from '../../domain/use-cases/get-folder'
import { RenameFolder } from '../../domain/use-cases/rename-folder'
import { FolderController } from '../../infra/http/express/controllers/folder-controller'

export function createFolderController(
  createFolder: CreateFolder,
  getFolder: GetFolder,
  renameFolder: RenameFolder
) {
  return new FolderController(createFolder, getFolder, renameFolder)
}
