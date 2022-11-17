import { MoveFile } from '../../../application/use-cases/move-file'
import { Factory } from '../../factory'
import { FilePrismaRepositoryFactory } from '../../infra/repositories/file-prisma-repository-factory'
import { IsFileNameAvailbleFactory } from './is-file-name-availble-factory'
import { UserHasFilePermissionFactory } from './user-has-file-permission-factory'
import { UserHasFolderPermissionFactory } from './user-has-folder-permission-factory'

export const MoveFileFactory: Factory<MoveFile> = {
  async create() {
    return new MoveFile(
      await UserHasFolderPermissionFactory.create(),
      await UserHasFilePermissionFactory.create(),
      await IsFileNameAvailbleFactory.create(),
      await FilePrismaRepositoryFactory.create()
    )
  }
}
