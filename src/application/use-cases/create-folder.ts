import { CreateFolderRepository } from '../../data/create-folder-repository'
import { ForeignKeyConstraintError } from '../../data/errors/foreign-key-constraint-error'
import { FindFolderRepository } from '../../data/find-folder-repository'
import { FindUserRepository } from '../../data/find-user-repository'
import { CreateFolder as ICreateFolder, CreateFolderData } from '../../domain/use-cases/create-folder'
import { IsFolderNameAvailble } from '../../domain/use-cases/is-folder-name-availble'
import { UserHasFolderPermission } from '../../domain/use-cases/user-has-folder-permission'
import { PermissionError } from '../errors/permission-error'
import { SameNameError } from '../errors/same-name-error'
export class CreateFolder implements ICreateFolder {
  constructor(
    private readonly folderRepository: CreateFolderRepository & FindFolderRepository,
    private readonly findUserRepository: FindUserRepository,
    private readonly userHasFolderPermission: UserHasFolderPermission,
    private readonly isFolderNameAvailble: IsFolderNameAvailble
  ) {}

  async exec(data: CreateFolderData) {
    const user = await this.findUserRepository.find({ id: data.userId })
    if (!user) {
      throw new ForeignKeyConstraintError('Folder', 'userId', 'User')
    }
    if (data.parentId) {
      const [nameAvailble, parentFolder] = await Promise.all([
        this.isFolderNameAvailble.exec({ name: data.name, parentFolderId: data.parentId }),
        this.folderRepository.find({ id: data.parentId })
      ])
      if (!parentFolder) throw new ForeignKeyConstraintError('Folder', 'parentId', 'Folder')
      if (!nameAvailble) throw new SameNameError()

      const hasPermission = await this.userHasFolderPermission.exec({ userId: data.userId, folderId: data.parentId })
      if (!hasPermission) throw new PermissionError()
    }
    return await this.folderRepository.createFolder(data)
  }
}
