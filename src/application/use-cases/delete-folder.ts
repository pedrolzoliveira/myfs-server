import { DeleteFolderRepository } from '../../data/delete-folder-repository'
import { DeleteFolder as IDeleteFolder, DeleteFolderData } from '../../domain/use-cases/delete-folder'
import { UserHasFolderPermission } from '../../domain/use-cases/user-has-folder-permission'
import { PermissionError } from '../errors/permission-error'

export class DeleteFolder implements IDeleteFolder {
  constructor(
    private readonly deleteFolderRepository: DeleteFolderRepository,
    private readonly userHasFolderPermission: UserHasFolderPermission
  ) {}

  async exec(data: DeleteFolderData) {
    const hasPermission = await this.userHasFolderPermission.exec({ userId: data.userId, folderId: data.id })
    if (!hasPermission) {
      throw new PermissionError()
    }
    return await this.deleteFolderRepository.deleteFolder(data)
  }
}
