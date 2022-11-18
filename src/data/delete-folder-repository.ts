export interface DeleteFolderData {
  id: string
  callback?: Function
}

export interface DeleteFolderRepository {
  deleteFolder: (data: DeleteFolderData) => Promise<boolean>
}
