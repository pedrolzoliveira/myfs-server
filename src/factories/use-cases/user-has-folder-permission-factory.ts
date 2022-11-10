import { UserHasFolderPermission } from '../../application/use-cases/user-has-folder-permission'
import { FindFolderRepository } from '../../data/find-folder-repository'
import { FindUserRepository } from '../../data/find-user-repository'

export function createUserHasFolderPermission(findUserRepository: FindUserRepository, findFolderRepository: FindFolderRepository) {
  return new UserHasFolderPermission(findUserRepository, findFolderRepository)
}
