import { UserHasFolderPermission } from '../../../application/use-cases/user-has-folder-permission'
import { Factory } from '../../factory'
import { FolderPrismaRepositoryFactory } from '../../infra/repositories/folder-prisma-repository-factory'
import { UserPrismaRepositoryFactory } from '../../infra/repositories/user-prisma-repository'

export const UserHasFolderPermissionFactory: Factory<UserHasFolderPermission> = {
  async create() {
    return new UserHasFolderPermission(
      await UserPrismaRepositoryFactory.create(),
      await FolderPrismaRepositoryFactory.create()
    )
  }
}
