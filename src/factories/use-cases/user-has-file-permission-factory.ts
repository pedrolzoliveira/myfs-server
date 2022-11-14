import { UserHasFilePermission } from '../../application/use-cases/user-has-file-permission'
import { FindFileRepository } from '../../data/find-file-repository'
import { FindFolderRepository } from '../../data/find-folder-repository'
import { FindUserRepository } from '../../data/find-user-repository'

export function createUserHasFilePermission(
  findUser: FindUserRepository,
  findFile: FindFileRepository,
  findfolder: FindFolderRepository
) {
  return new UserHasFilePermission(findUser, findFile, findfolder)
}
