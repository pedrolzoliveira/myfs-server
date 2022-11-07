import { FilePermission } from '../domain/model/file-permission'

export interface UpsertFilePermissionData {
  userId: string
  fileId: string
  read: boolean
  write: boolean
  delete: boolean
}

export interface UpsertFilePermissionRepository {
  exec: (data: UpsertFilePermissionData) => Promise<FilePermission>
}
