import { CreateFolderRepository } from '../../../data/create-folder-repository'
import { DeleteFolderRepository } from '../../../data/delete-folder-repository'
import { FindAllFolderRepository } from '../../../data/find-all-folder-repository'
import { FindFolderRepository } from '../../../data/find-folder-repository'
import { FindFolderTreeRepository } from '../../../data/find-folder-tree-repository'
import { UpdateFolderRepository } from '../../../data/update-folder-repository'
import { FolderPrismaRepository } from '../../../infra/database/repositories/folder-prisma-resitory'
import { Factory } from '../../factory'
import { PrismaClientFactory } from '../prisma-client-factory'

export const FolderPrismaRepositoryFactory: Factory<FindFolderRepository & FindAllFolderRepository & UpdateFolderRepository & CreateFolderRepository & DeleteFolderRepository & FindFolderTreeRepository> = {
  async create() {
    return new FolderPrismaRepository(
      await PrismaClientFactory.create()
    )
  }
}
