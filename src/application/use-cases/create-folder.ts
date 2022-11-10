import { CreateFolderRepository } from '../../data/create-folder-repository'
import { ForeignKeyConstraintError } from '../../data/errors/foreign-key-constraint-error'
import { FindUserRepository } from '../../data/find-user-repository'
import { CreateFolder as ICreateFolder, CreateFolderData } from '../../domain/use-cases/create-folder'
import { UserHasFolderPermission } from '../../domain/use-cases/user-has-folder-permission'
import { PermissionError } from '../errors/permission-error'
export class CreateFolder implements ICreateFolder {
  constructor(
    private readonly createFolderRepository: CreateFolderRepository,
    private readonly findUserRepository: FindUserRepository,
    private readonly userHasFolderPermission: UserHasFolderPermission
  ) {}

  async exec(data: CreateFolderData) {
    const user = await this.findUserRepository.find({ id: data.userId })
    if (!user) {
      throw new ForeignKeyConstraintError('Folder', 'userId', 'User')
    }
    if (data.parentId) {
      const hasPermission = await this.userHasFolderPermission.exec({ userId: data.userId, folderId: data.parentId })
      if (!hasPermission) throw new PermissionError()
    }
    return await this.createFolderRepository.createFolder(data)
  }
}
