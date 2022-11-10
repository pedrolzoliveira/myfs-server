import { FindFolderRepository } from '../../data/find-folder-repository'
import { FindUserRepository } from '../../data/find-user-repository'
import { UserHasFolderPermission as IUserHasFolderPermission, UserHasFolderPermissionData } from '../../domain/use-cases/user-has-folder-permission'
export class UserHasFolderPermission implements IUserHasFolderPermission {
  constructor(
    private readonly findUserRepository: FindUserRepository,
    private readonly findFolderRepository: FindFolderRepository
  ) {}

  async exec(data: UserHasFolderPermissionData) {
    const [user, folder] = await Promise.all([
      this.findUserRepository.find({ id: data.userId }),
      this.findFolderRepository.find({ id: data.folderId })
    ])
    return user?.id === folder?.userId
  }
}
