import { IsNameAvailble } from '../../application/use-cases/is-name-availble'
import { FindFolderRepository } from '../../data/find-folder-repository'

export function createIsNameAvailble(findFolderRepository: FindFolderRepository) {
  return new IsNameAvailble(findFolderRepository)
}
