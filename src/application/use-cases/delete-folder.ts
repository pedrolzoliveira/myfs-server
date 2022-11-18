import { DeleteFolderRepository } from '../../data/delete-folder-repository'
import { FindFolderTreeRepository, FolderTree } from '../../data/find-folder-tree-repository'
import { DeleteFolder as IDeleteFolder, DeleteFolderData } from '../../domain/use-cases/delete-folder'
import { UserHasFolderPermission } from '../../domain/use-cases/user-has-folder-permission'
import { DeleteFilesPublisher } from '../../infra/mqtt/rabbitmq/delete-files/publisher'
import { PermissionError } from '../errors/permission-error'

export class DeleteFolder implements IDeleteFolder {
  constructor(
    private readonly folderRepository: DeleteFolderRepository & FindFolderTreeRepository,
    private readonly userHasFolderPermission: UserHasFolderPermission,
    private readonly deleteFilesPublisher: DeleteFilesPublisher
  ) {}

  async exec(data: DeleteFolderData) {
    const helper = (folderTree: FolderTree): string[] => {
      return [
        ...folderTree.files.map(file => file.location),
        ...folderTree.folders.map(helper).flat()
      ]
    }
    const hasPermission = await this.userHasFolderPermission.exec({ userId: data.userId, folderId: data.id })
    if (!hasPermission) {
      throw new PermissionError()
    }
    const parentFolder = await this.folderRepository.getTree(data.id)
    const locations = helper(parentFolder)
    await this.folderRepository.deleteFolder({
      id: data.id,
      callback: () => this.deleteFilesPublisher.publish({ locations })
    })
  }
}
