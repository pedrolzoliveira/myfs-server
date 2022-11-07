import { UpsertFolderPermissionRepository } from '../../data/upsert-folder-permission-repository'
import { SetFolderPermission as ISetFolderPermission, SetFolderPermissionData } from '../../domain/use-cases/set-folder-permission'

export class SetFolderPermission implements ISetFolderPermission {
  constructor(
    readonly upsertFolderPermission: UpsertFolderPermissionRepository
  ) {}

  async exec(data: SetFolderPermissionData) {
    return await this.upsertFolderPermission.exec({
      userId: data.userId,
      folderId: data.folderId,
      read: data.permissions.has('read'),
      write: data.permissions.has('write'),
      delete: data.permissions.has('delete')
    })
  }
}
