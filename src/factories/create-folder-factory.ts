import { CreateFolder } from '../application/use-cases/create-folder'
import { FolderPrismaRepository } from '../infra/database/repositories/folder-prisma-resitory'

export function createCreateFolder(folderRepository: FolderPrismaRepository) {
  return new CreateFolder(folderRepository)
}
