import { UserHasFilePermission } from '../../../application/use-cases/user-has-file-permission'
import { Factory } from '../../factory'
import { FilePrismaRepositoryFactory } from '../../infra/repositories/file-prisma-repository-factory'
import { FolderPrismaRepositoryFactory } from '../../infra/repositories/folder-prisma-repository-factory'
import { UserPrismaRepositoryFactory } from '../../infra/repositories/user-prisma-repository'

export const UserHasFilePermissionFactory: Factory<UserHasFilePermission> = {
  async create() {
    return new UserHasFilePermission(
      await UserPrismaRepositoryFactory.create(),
      await FilePrismaRepositoryFactory.create(),
      await FolderPrismaRepositoryFactory.create()
    )
  }
}
