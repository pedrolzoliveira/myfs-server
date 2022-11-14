import { FindFileRepository } from '../../data/find-file-repository'
import { UpdateFileRepository } from '../../data/update-file-repository'
import { IsFileNameAvailble } from '../../domain/use-cases/is-file-name-availble'
import { RenameFile as IRenameFile, RenameFileData } from '../../domain/use-cases/rename-file'
import { UserHasFilePermission } from '../../domain/use-cases/user-has-file-permission'
import { EmptyResultError } from '../errors/empty-result-error'
import { PermissionError } from '../errors/permission-error'
import { SameNameError } from '../errors/same-name-error'

export class RenameFile implements IRenameFile {
  constructor(
    private readonly fileRepostiory: FindFileRepository & UpdateFileRepository,
    private readonly userHasPermission: UserHasFilePermission,
    private readonly isFileNameAvailble: IsFileNameAvailble
  ) {}

  async exec(data: RenameFileData) {
    const hasPermission = await this.userHasPermission.exec({
      userId: data.userId,
      fileId: data.id
    })
    if (!hasPermission) {
      throw new PermissionError()
    }
    const file_ = await this.fileRepostiory.find({ id: data.id })
    if (!file_) {
      throw new EmptyResultError()
    }
    const isNamaAvailble = await this.isFileNameAvailble.exec({
      name: data.name,
      folderId: file_.folderId
    })
    if (!isNamaAvailble) throw new SameNameError()

    const file = await this.fileRepostiory.update({
      id: data.id,
      name: data.name
    })
    return file
  }
}
