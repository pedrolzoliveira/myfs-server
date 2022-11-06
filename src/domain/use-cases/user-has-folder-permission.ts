
export interface UserHasFolderPermissionData {
  userId: string
  folderId: string
}

export interface UserHasFolderPermission {
  exec: (data: UserHasFolderPermissionData) => Promise<boolean>
}
