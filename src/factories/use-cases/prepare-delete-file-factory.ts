import { PrepareDeleteFile } from '../../application/use-cases/prepare-delete-file'
import { DeleteFileRepository } from '../../data/delete-file-repository'
import { FindFileRepository } from '../../data/find-file-repository'
import { UserHasFilePermission } from '../../domain/use-cases/user-has-file-permission'
import { DeleteFilePublisher } from '../../infra/mqtt/rabbitmq/delete-file-publisher'

export function createPrepareDeleteFile(
  userHasFilePermission: UserHasFilePermission,
  fileRepo: DeleteFileRepository & FindFileRepository,
  deleteFilePublisher: DeleteFilePublisher
) {
  return new PrepareDeleteFile(userHasFilePermission, fileRepo, deleteFilePublisher)
}
