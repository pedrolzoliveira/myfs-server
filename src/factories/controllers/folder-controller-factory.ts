import { CreateFolder } from '../../domain/use-cases/create-folder'
import { GetFolder } from '../../domain/use-cases/get-folder'
import { FolderController } from '../../infra/http/express/controllers/folder-controller'

export function createFolderController(
  createFolder: CreateFolder,
  getFolder: GetFolder
) {
  return new FolderController(createFolder, getFolder)
}
