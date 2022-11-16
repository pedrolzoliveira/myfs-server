import { IsFolderNameAvailble } from '../../../application/use-cases/is-folder-name-availble'
import { Factory } from '../../factory'
import { FolderPrismaRepositoryFactory } from '../../infra/repositories/folder-prisma-repository-factory'

export const IsFolderNameAvailbleFactory: Factory<IsFolderNameAvailble> = {
  async create() {
    return new IsFolderNameAvailble(
      await FolderPrismaRepositoryFactory.create()
    )
  }
}
