import { UpsertFilePermissionRepository } from '../../data/upsert-file-permission-repository'
import { FilePermission } from '../model/file-permission'

export interface SetFilePermissionData {
  userId: string
  fileId: string
  permissions: Set<'read' | 'write' | 'delete'>
}

export interface SetFilePermission {
  readonly upsertFilePermission: UpsertFilePermissionRepository
  exec: (data: SetFilePermissionData) => Promise<FilePermission>
}
