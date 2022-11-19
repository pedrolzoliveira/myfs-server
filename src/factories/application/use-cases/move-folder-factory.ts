import { MoveFolder } from '../../../application/use-cases/move-folder'
import { Factory } from '../../factory'
import { FolderPrismaRepositoryFactory } from '../../infra/repositories/folder-prisma-repository-factory'
import { IsFolderNameAvailbleFactory } from './is-folder-name-availble-factory'
import { UserHasFolderPermissionFactory } from './user-has-folder-permission-factory'

export const MoveFolderFactory: Factory<MoveFolder> = {
  async create() {
    return new MoveFolder(
      await UserHasFolderPermissionFactory.create(),
      await FolderPrismaRepositoryFactory.create(),
      await IsFolderNameAvailbleFactory.create()
    )
  }
}
