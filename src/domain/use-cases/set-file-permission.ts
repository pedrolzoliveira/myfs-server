import { FilePermission } from '../model/file-permission'

export interface SetFilePermissionData {
  userId: string
  fileId: string
  permissions: Set<'read' | 'write' | 'delete'>
}

export interface SetFilePermission {
  exec: (data: SetFilePermissionData) => Promise<FilePermission>
}
