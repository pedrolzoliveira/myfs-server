import { RenameFile } from '../../application/use-cases/rename-file'
import { FindFileRepository } from '../../data/find-file-repository'
import { UpdateFileRepository } from '../../data/update-file-repository'
import { IsFileNameAvailble } from '../../domain/use-cases/is-file-name-availble'
import { UserHasFilePermission } from '../../domain/use-cases/user-has-file-permission'

export function createRenameFile(
  fileRepository: FindFileRepository & UpdateFileRepository,
  userHasPermission: UserHasFilePermission,
  isFileNameAvailble: IsFileNameAvailble
) {
  return new RenameFile(fileRepository, userHasPermission, isFileNameAvailble)
}
