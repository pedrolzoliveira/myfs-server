import { RenameFolder } from '../../application/use-cases/rename-folder'
import { FindFolderRepository } from '../../data/find-folder-repository'
import { UpdateFolderRepository } from '../../data/update-folder-repository'
import { IsNameAvailble } from '../../domain/use-cases/is-name-availble'
import { UserHasFolderPermission } from '../../domain/use-cases/user-has-folder-permission'

export function createRenameFolder(folderRepository: FindFolderRepository & UpdateFolderRepository, isNameAvailble: IsNameAvailble, userHasFolderPermission: UserHasFolderPermission) {
  return new RenameFolder(folderRepository, isNameAvailble, userHasFolderPermission)
}
