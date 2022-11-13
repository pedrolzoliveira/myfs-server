import { RenameFolder as IRenameFolder, RenameFolderData } from '../../domain/use-cases/rename-folder'
import { UpdateFolderRepository } from '../../data/update-folder-repository'
import { IsFolderNameAvailble } from '../../domain/use-cases/is-folder-name-availble'
import { FindFolderRepository } from '../../data/find-folder-repository'
import { EmptyResultError } from '../errors/empty-result-error'
import { SameNameError } from '../errors/same-name-error'
import { UserHasFolderPermission } from '../../domain/use-cases/user-has-folder-permission'
import { PermissionError } from '../errors/permission-error'

export class RenameFolder implements IRenameFolder {
  constructor (
    private readonly folderRepository: UpdateFolderRepository & FindFolderRepository,
    private readonly isFolderNameAvailble: IsFolderNameAvailble,
    private readonly userHasPermission: UserHasFolderPermission
  ) {}

  async exec(data: RenameFolderData) {
    const hasPermission = await this.userHasPermission.exec({
      folderId: data.id,
      userId: data.userId
    })
    if (!hasPermission) {
      throw new PermissionError()
    }
    const folder = await this.folderRepository.find({ id: data.id })
    if (!folder) {
      throw new EmptyResultError()
    }
    if (folder.parentId) {
      const isNameAvailble = await this.isFolderNameAvailble.exec({
        name: data.name,
        parentFolderId: folder.parentId
      })
      if (!isNameAvailble) throw new SameNameError()
    }
    return await this.folderRepository.updateFolder({
      id: data.id,
      name: data.name
    })
  }
}
