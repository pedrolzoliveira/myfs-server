import { PrepareDeleteFile } from '../../../application/use-cases/prepare-delete-file'
import { DeleteFileRepository } from '../../../data/delete-file-repository'
import { FindFileRepository } from '../../../data/find-file-repository'
import { UserHasFilePermission } from '../../../domain/use-cases/user-has-file-permission'
import { DeleteFilePublisher } from '../../../infra/mqtt/rabbitmq/delete-file/publisher'
import { DeleteFilePublisherFactory } from '../../infra/delete-file-publisher-factory'
import { Factory } from '../../factory'
import { FilePrismaRepositoryFactory } from '../../infra/repositories/file-prisma-repository-factory'
import { UserHasFilePermissionFactory } from './user-has-file-permission-factory'

export function createPrepareDeleteFile(
  userHasFilePermission: UserHasFilePermission,
  fileRepo: DeleteFileRepository & FindFileRepository,
  deleteFilePublisher: DeleteFilePublisher
) {
  return new PrepareDeleteFile(userHasFilePermission, fileRepo, deleteFilePublisher)
}

export const PrepareDeleteFileFactory: Factory<PrepareDeleteFile> = {
  async create() {
    return new PrepareDeleteFile(
      await UserHasFilePermissionFactory.create(),
      await FilePrismaRepositoryFactory.create(),
      await DeleteFilePublisherFactory.create()
    )
  }
}
