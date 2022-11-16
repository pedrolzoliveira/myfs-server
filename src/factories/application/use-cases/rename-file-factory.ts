import { RenameFile } from '../../../application/use-cases/rename-file'
import { Factory } from '../../factory'
import { FilePrismaRepositoryFactory } from '../../infra/repositories/file-prisma-repository-factory'
import { IsFileNameAvailbleFactory } from './is-file-name-availble-factory'
import { UserHasFilePermissionFactory } from './user-has-file-permission-factory'

export const RenameFileFactory: Factory<RenameFile> = {
  async create() {
    return new RenameFile(
      await FilePrismaRepositoryFactory.create(),
      await UserHasFilePermissionFactory.create(),
      await IsFileNameAvailbleFactory.create()
    )
  }
}
