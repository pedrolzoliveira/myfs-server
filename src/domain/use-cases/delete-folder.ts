export interface DeleteFolderData {
  userId: string
  id: string
}

export interface DeleteFolder {
  exec: (data: DeleteFolderData) => Promise<void>
}
