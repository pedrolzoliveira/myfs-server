import { FolderPermission } from '../domain/model/folder-permission'

export interface UpsertFolderPermissionData {
  userId: string
  folderId: string
  read: boolean
  write: boolean
  delete: boolean
}

export interface UpsertFolderPermissionRepository {
  exec: (data: UpsertFolderPermissionData) => Promise<FolderPermission>
}
