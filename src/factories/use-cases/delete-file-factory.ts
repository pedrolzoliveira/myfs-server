import { DeleteFile } from '../../application/use-cases/delete-file'
import { DeleteFileRepository } from '../../data/delete-file-repository'
import { FindFileRepository } from '../../data/find-file-repository'
import { UserHasFilePermission } from '../../domain/use-cases/user-has-file-permission'

export function createDeleteFile(
  userHasFilePermission: UserHasFilePermission,
  fileRepository: DeleteFileRepository & FindFileRepository
) {
  return new DeleteFile(userHasFilePermission, fileRepository)
}
