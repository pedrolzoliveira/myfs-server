import { GetFolder } from '../../../application/use-cases/get-folder'
import { FolderPrismaRepository } from '../../../infra/database/repositories/folder-prisma-resitory'
import { Factory } from '../../factory'
import { FolderPrismaRepositoryFactory } from '../../infra/repositories/folder-prisma-repository-factory'

export function createGetFolder(folderRepository: FolderPrismaRepository) {
  return new GetFolder(folderRepository)
}

export const GetFolderFactory: Factory<GetFolder> = {
  async create() {
    return new GetFolder(
      await FolderPrismaRepositoryFactory.create()
    )
  }
}
