export interface DeleteFolderData {
  id: string
}

export interface DeleteFolder {
  exec: (data: DeleteFolderData) => Promise<boolean>
}
