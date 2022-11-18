import { DeleteFolder } from '../../../application/use-cases/delete-folder'
import { Factory } from '../../factory'
import { DeleteFilesPublisherFactory } from '../../infra/delete-files-publisher-factory'
import { FolderPrismaRepositoryFactory } from '../../infra/repositories/folder-prisma-repository-factory'
import { UserHasFolderPermissionFactory } from './user-has-folder-permission-factory'

export const DeleteFolderFactory: Factory<DeleteFolder> = {
  async create() {
    return new DeleteFolder(
      await FolderPrismaRepositoryFactory.create(),
      await UserHasFolderPermissionFactory.create(),
      await DeleteFilesPublisherFactory.create()
    )
  }
}
