import { CreateFolder } from '../../application/use-cases/create-folder'
import { FindUserRepository } from '../../data/find-user-repository'
import { FolderPrismaRepository } from '../../infra/database/repositories/folder-prisma-resitory'

export function createCreateFolder(folderRepository: FolderPrismaRepository, findUserRepository: FindUserRepository) {
  return new CreateFolder(folderRepository, findUserRepository)
}
