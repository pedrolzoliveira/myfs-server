import { FindFileRepository } from '../../data/find-file-repository'
import { UpdateFileRepository } from '../../data/update-file-repository'
import { RenameFile as IRenameFile, RenameFileData } from '../../domain/use-cases/rename-file'
import { UserHasFilePermission } from '../../domain/use-cases/user-has-file-permission'
import { EmptyResultError } from '../errors/empty-result-error'
import { PermissionError } from '../errors/permission-error'

export class RenameFile implements IRenameFile {
  constructor(
    private readonly fileRepostiory: FindFileRepository & UpdateFileRepository,
    private readonly userHasPermission: UserHasFilePermission
  ) {}

  async exec(data: RenameFileData) {
    const hasPermission = await this.userHasPermission.exec({
      userId: data.userId,
      fileId: data.id
    })
    if (!hasPermission) {
      throw new PermissionError()
    }
    const file = await this.fileRepostiory.find({ id: data.id })
    if (!file) {
      throw new EmptyResultError()
    }

    return {} as any
  }
}
