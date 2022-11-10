import { DeleteFolder } from '../../application/use-cases/delete-folder'
import { DeleteFolderRepository } from '../../data/delete-folder-repository'
import { UserHasFolderPermission } from '../../domain/use-cases/user-has-folder-permission'

export function createDeleteFolder(deleteFolderRepository: DeleteFolderRepository, userHasFolderPermission: UserHasFolderPermission) {
  return new DeleteFolder(deleteFolderRepository, userHasFolderPermission)
}
