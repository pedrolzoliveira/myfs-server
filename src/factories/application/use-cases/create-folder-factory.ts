import { CreateFolder } from '../../../application/use-cases/create-folder'
import { Factory } from '../../factory'
import { FolderPrismaRepositoryFactory } from '../../infra/repositories/folder-prisma-repository-factory'
import { UserPrismaRepositoryFactory } from '../../infra/repositories/user-prisma-repository'
import { IsFolderNameAvailbleFactory } from './is-folder-name-availble-factory'
import { UserHasFolderPermissionFactory } from './user-has-folder-permission-factory'

export const CreateFolderFactory: Factory<CreateFolder> = {
  async create() {
    return new CreateFolder(
      await FolderPrismaRepositoryFactory.create(),
      await UserPrismaRepositoryFactory.create(),
      await UserHasFolderPermissionFactory.create(),
      await IsFolderNameAvailbleFactory.create()
    )
  }
}
