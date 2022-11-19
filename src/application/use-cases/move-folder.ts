import { FindFolderRepository } from '../../data/find-folder-repository'
import { UpdateFolderRepository } from '../../data/update-folder-repository'
import { IsFolderNameAvailble } from '../../domain/use-cases/is-folder-name-availble'
import { MoveFolder as IMoveFolder, MoveFolderData } from '../../domain/use-cases/move-folder'
import { UserHasFolderPermission } from '../../domain/use-cases/user-has-folder-permission'
import { EmptyResultError } from '../errors/empty-result-error'
import { PermissionError } from '../errors/permission-error'
import { SameNameError } from '../errors/same-name-error'

export class MoveFolder implements IMoveFolder {
  constructor(
    private readonly userHasFolderPermission: UserHasFolderPermission,
    private readonly folderRepo: UpdateFolderRepository & FindFolderRepository,
    private readonly isFolderNameAvailble: IsFolderNameAvailble
  ) {}

  async exec({ userId, id, parentId }: MoveFolderData) {
    if (parentId) {
      const [folderPermission, parentFolderPermission] = await Promise.all([
        this.userHasFolderPermission.exec({ userId, folderId: id }),
        this.userHasFolderPermission.exec({ userId, folderId: parentId })
      ])
      if (!folderPermission || !parentFolderPermission) {
        throw new PermissionError()
      }
    } else {
      const folderPermission = await this.userHasFolderPermission.exec({ userId, folderId: id })
      if (!folderPermission) {
        throw new PermissionError()
      }
    }
    const folder = await this.folderRepo.find({ id })
    if (!folder) throw new EmptyResultError()

    const isNameAvailble = await this.isFolderNameAvailble.exec({ name: folder.name, parentFolderId: parentId })

    if (!isNameAvailble) throw new SameNameError()

    return this.folderRepo.updateFolder({ id, parentId })
  }
}
