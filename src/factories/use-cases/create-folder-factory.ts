import { CreateFolder } from '../../application/use-cases/create-folder'
import { FindUserRepository } from '../../data/find-user-repository'
import { IsNameAvailble } from '../../domain/use-cases/is-name-availble'
import { UserHasFolderPermission } from '../../domain/use-cases/user-has-folder-permission'
import { FolderPrismaRepository } from '../../infra/database/repositories/folder-prisma-resitory'

export function createCreateFolder(folderRepository: FolderPrismaRepository, findUserRepository: FindUserRepository, userHasFolderPermission: UserHasFolderPermission, isNameAvailble: IsNameAvailble) {
  return new CreateFolder(folderRepository, findUserRepository, userHasFolderPermission, isNameAvailble)
}
