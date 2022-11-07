import { UpsertFilePermissionRepository } from '../../data/upsert-file-permission-repository'
import { SetFilePermission as ISetFilePermission, SetFilePermissionData } from '../../domain/use-cases/set-file-permission'

export class SetFilePermission implements ISetFilePermission {
  constructor(
    readonly upsertFilePermission: UpsertFilePermissionRepository
  ) {}

  async exec(data: SetFilePermissionData) {
    return await this.upsertFilePermission.exec({
      userId: data.userId,
      fileId: data.fileId,
      read: data.permissions.has('read'),
      write: data.permissions.has('write'),
      delete: data.permissions.has('delete')
    })
  }
}
