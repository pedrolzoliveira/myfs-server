import { UpsertFolderPermissionRepository } from '../../data/upsert-folder-permission-repository'
import { FolderPermission } from '../model/folder-permission'

export interface SetFolderPermissionData {
  userId: string
  folderId: string
  permissions: Set<'read' | 'write' | 'delete'>
}

export interface SetFolderPermission {
  readonly upsertFolderPermission: UpsertFolderPermissionRepository
  exec: (data: SetFolderPermissionData) => Promise<FolderPermission>
}
