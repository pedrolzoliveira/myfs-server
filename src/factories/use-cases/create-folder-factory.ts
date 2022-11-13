import { CreateFolder } from '../../application/use-cases/create-folder'
import { FindUserRepository } from '../../data/find-user-repository'
import { IsFolderNameAvailble } from '../../domain/use-cases/is-folder-name-availble'
import { UserHasFolderPermission } from '../../domain/use-cases/user-has-folder-permission'
import { FolderPrismaRepository } from '../../infra/database/repositories/folder-prisma-resitory'

export function createCreateFolder(
  folderRepository: FolderPrismaRepository,
  findUserRepository: FindUserRepository,
  userHasFolderPermission: UserHasFolderPermission,
  isFolderNameAvailble: IsFolderNameAvailble
) {
  return new CreateFolder(folderRepository, findUserRepository, userHasFolderPermission, isFolderNameAvailble)
}
