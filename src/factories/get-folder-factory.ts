import { GetFolder } from '../application/use-cases/get-folder'
import { FolderPrismaRepository } from '../infra/database/repositories/folder-prisma-resitory'

export function createGetFolder(folderRepository: FolderPrismaRepository) {
  return new GetFolder(folderRepository)
}
