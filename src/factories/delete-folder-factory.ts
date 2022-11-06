import { DeleteFolder } from '../application/use-cases/delete-folder'
import { DeleteFolderRepository } from '../data/delete-folder-repository'

export function createDeleteFolder(deleteFolderRepository: DeleteFolderRepository) {
  return new DeleteFolder(deleteFolderRepository)
}
