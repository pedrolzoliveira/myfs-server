
export interface UserHasFilePermissionData {
  userId: string
  fileId: string
}

export interface UserHasFilePermission {
  exec: (data: UserHasFilePermissionData) => Promise<boolean>
}
