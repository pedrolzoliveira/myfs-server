import { MoveFile as IMoveFile, MoveFileData } from '../../domain/use-cases/move-file'
import { UpdateFileRepository } from '../../data/update-file-repository'
import { IsFileNameAvailble } from '../../domain/use-cases/is-file-name-availble'
import { UserHasFilePermission } from '../../domain/use-cases/user-has-file-permission'
import { UserHasFolderPermission } from '../../domain/use-cases/user-has-folder-permission'
import { FindFileRepository } from '../../data/find-file-repository'
import { PermissionError } from '../errors/permission-error'
import { EmptyResultError } from '../errors/empty-result-error'
import { SameNameError } from '../errors/same-name-error'

export class MoveFile implements IMoveFile {
  constructor(
    private readonly userHasFolderPermission: UserHasFolderPermission,
    private readonly userHasFilePermission: UserHasFilePermission,
    private readonly isFileNameAvailble: IsFileNameAvailble,
    private readonly fileRepository: UpdateFileRepository & FindFileRepository
  ) {}

  async exec({ id, userId, folderId }: MoveFileData) {
    const file = await this.fileRepository.find({ id })
    if (!file) {
      throw new EmptyResultError()
    }
    const [userHasFilePermission, userHasFolderPermission] = await Promise.all([
      this.userHasFilePermission.exec({ userId, fileId: id }),
      this.userHasFolderPermission.exec({ userId, folderId })
    ])
    if (!userHasFilePermission || !userHasFolderPermission) {
      throw new PermissionError()
    }

    const isFileNameAvailble = await this.isFileNameAvailble.exec({ folderId, name: file.name })
    if (!isFileNameAvailble) {
      throw new SameNameError()
    }

    return await this.fileRepository.update({ id, folderId })
  }
}
