import { RenameFolder } from '../../../application/use-cases/rename-folder'
import { Factory } from '../../factory'
import { FolderPrismaRepositoryFactory } from '../../infra/repositories/folder-prisma-repository-factory'
import { IsFolderNameAvailbleFactory } from './is-folder-name-availble-factory'
import { UserHasFolderPermissionFactory } from './user-has-folder-permission-factory'

export const RenameFolderFactory: Factory<RenameFolder> = {
  async create() {
    return new RenameFolder(
      await FolderPrismaRepositoryFactory.create(),
      await IsFolderNameAvailbleFactory.create(),
      await UserHasFolderPermissionFactory.create()
    )
  }
}
