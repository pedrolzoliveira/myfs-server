import { DeleteFileRepository } from '../../data/delete-file-repository'
import { FindFileRepository } from '../../data/find-file-repository'
import { DeleteFile as IDeleteFile, DeleteFileData } from '../../domain/use-cases/delete-file'
import { UserHasFilePermission } from '../../domain/use-cases/user-has-file-permission'
import { EmptyResultError } from '../errors/empty-result-error'
import { PermissionError } from '../errors/permission-error'
import { unlink } from 'fs/promises'

export class DeleteFile implements IDeleteFile {
  constructor(
    private readonly userHasFilePermission: UserHasFilePermission,
    private readonly fileRepository: DeleteFileRepository & FindFileRepository
  ) {}

  async exec(data: DeleteFileData) {
    const file = await this.fileRepository.find({
      id: data.id
    })
    if (!file) throw new EmptyResultError()
    const hasPermission = await this.userHasFilePermission.exec({
      fileId: data.id,
      userId: data.userId
    })
    if (!hasPermission) throw new PermissionError()
    return await this.fileRepository.delete({
      id: data.id,
      callback: async () => unlink(file.location)
    })
  }
}
