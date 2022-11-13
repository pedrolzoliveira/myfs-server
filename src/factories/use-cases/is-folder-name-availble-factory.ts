import { IsFolderNameAvailble } from '../../application/use-cases/is-folder-name-availble'
import { FindFolderRepository } from '../../data/find-folder-repository'

export function createIsNameAvailble(findFolderRepository: FindFolderRepository) {
  return new IsFolderNameAvailble(findFolderRepository)
}
