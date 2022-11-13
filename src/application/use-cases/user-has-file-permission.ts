import { FindFileRepository } from '../../data/find-file-repository'
import { FindFolderRepository } from '../../data/find-folder-repository'
import { FindUserRepository } from '../../data/find-user-repository'
import { UserHasFilePermission as IUserHasFilePermission, UserHasFilePermissionData } from '../../domain/use-cases/user-has-file-permission'
import { EmptyResultError } from '../errors/empty-result-error'

export class UserHasFilePermission implements IUserHasFilePermission {
  constructor(
    private readonly findUser: FindUserRepository,
    private readonly findFile: FindFileRepository,
    private readonly findFolder: FindFolderRepository
  ) {}

  async exec(data: UserHasFilePermissionData) {
    const file = await this.findFile.find({ id: data.fileId })
    if (!file) throw new EmptyResultError()

    const [user, folder] = await Promise.all([
      this.findUser.find({ id: data.userId }),
      this.findFolder.find({ id: file?.folderId })
    ])
    if (!user || !folder) throw new EmptyResultError()
    return user.id === folder.userId
  }
}
