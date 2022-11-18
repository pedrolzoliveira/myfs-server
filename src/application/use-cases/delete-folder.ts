import { DeleteFolderRepository } from '../../data/delete-folder-repository'
import { DeleteFolder as IDeleteFolder, DeleteFolderData } from '../../domain/use-cases/delete-folder'
import { UserHasFolderPermission } from '../../domain/use-cases/user-has-folder-permission'
import { DeleteFilePublisher } from '../../infra/mqtt/rabbitmq/delete-file/publisher'
import { PermissionError } from '../errors/permission-error'

export class DeleteFolder implements IDeleteFolder {
  constructor(
    private readonly deleteFolderRepository: DeleteFolderRepository,
    private readonly userHasFolderPermission: UserHasFolderPermission,
    private readonly deleteFilePublisher: DeleteFilePublisher
  ) {}

  async exec(data: DeleteFolderData) {
    const hasPermission = await this.userHasFolderPermission.exec({ userId: data.userId, folderId: data.id })
    if (!hasPermission) {
      throw new PermissionError()
    }
    return await this.deleteFolderRepository.deleteFolder(data)
  }
}
