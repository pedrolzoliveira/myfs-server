import { DeleteFileRepository } from '../../data/delete-file-repository'
import { FindFileRepository } from '../../data/find-file-repository'
import { PrepareDeleteFile as IPrepareDeleteFile, PrepareDeleteFileData } from '../../domain/use-cases/prepare-delete-file'
import { UserHasFilePermission } from '../../domain/use-cases/user-has-file-permission'
import { DeleteFilePublisher } from '../../infra/mqtt/rabbitmq/delete-file-publisher'
import { EmptyResultError } from '../errors/empty-result-error'
import { PermissionError } from '../errors/permission-error'

export class PrepareDeleteFile implements IPrepareDeleteFile {
  constructor(
    private readonly userHasFilePermission: UserHasFilePermission,
    private readonly fileRepository: DeleteFileRepository & FindFileRepository,
    private readonly deleteFilePublisher: DeleteFilePublisher
  ) {}

  async exec({ id, userId }: PrepareDeleteFileData) {
    const file = await this.fileRepository.find({ id })
    if (!file) {
      throw new EmptyResultError()
    }
    const hasPermission = await this.userHasFilePermission.exec({ fileId: id, userId })
    if (!hasPermission) {
      throw new PermissionError()
    }
    return await this.fileRepository.delete({
      id,
      callback: () => this.deleteFilePublisher.publish({ location: file.location })
    })
  }
}
