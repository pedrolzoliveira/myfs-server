export interface FilePermission {
  userId: string
  fileId: string
  read: boolean
  write: boolean
  delete: boolean
}
