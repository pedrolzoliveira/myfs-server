export interface FolderPermission {
  userId: string
  folderId: string
  read: boolean
  write: boolean
  delete: boolean
}
