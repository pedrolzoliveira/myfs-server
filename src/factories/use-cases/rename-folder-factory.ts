import { RenameFolder } from '../../application/use-cases/rename-folder'
import { FindFolderRepository } from '../../data/find-folder-repository'
import { UpdateFolderRepository } from '../../data/update-folder-repository'
import { IsFolderNameAvailble } from '../../domain/use-cases/is-folder-name-availble'
import { UserHasFolderPermission } from '../../domain/use-cases/user-has-folder-permission'

export function createRenameFolder(
  folderRepository: FindFolderRepository & UpdateFolderRepository,
  isFolderNameAvailble: IsFolderNameAvailble,
  userHasFolderPermission: UserHasFolderPermission
) {
  return new RenameFolder(folderRepository, isFolderNameAvailble, userHasFolderPermission)
}
