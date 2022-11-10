import { FolderPermission } from '../model/folder-permission'

export interface SetFolderPermissionData {
  userId: string
  folderId: string
  permissions: Set<'read' | 'write' | 'delete'>
}

export interface SetFolderPermission {
  exec: (data: SetFolderPermissionData) => Promise<FolderPermission>
}
