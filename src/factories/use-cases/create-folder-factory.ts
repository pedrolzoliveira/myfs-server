import { CreateFolder } from '../../application/use-cases/create-folder'
import { FindUserRepository } from '../../data/find-user-repository'
import { UserHasFolderPermission } from '../../domain/use-cases/user-has-folder-permission'
import { FolderPrismaRepository } from '../../infra/database/repositories/folder-prisma-resitory'

export function createCreateFolder(folderRepository: FolderPrismaRepository, findUserRepository: FindUserRepository, userHasFolderPermission: UserHasFolderPermission) {
  return new CreateFolder(folderRepository, findUserRepository, userHasFolderPermission)
}
