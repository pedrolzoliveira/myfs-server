import { RenameFolder } from '../../application/use-cases/rename-folder'
import { FindFolderRepository } from '../../data/find-folder-repository'
import { UpdateFolderRepository } from '../../data/update-folder-repository'
import { IsNameAvailble } from '../../domain/use-cases/is-name-availble'

export function createRenameFolder(folderRepository: FindFolderRepository & UpdateFolderRepository, isNameAvailble: IsNameAvailble) {
  return new RenameFolder(folderRepository, isNameAvailble)
}
