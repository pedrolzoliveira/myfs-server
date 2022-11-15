export interface DeleteFolderData {
  id: string
  callback?: Function
}

export interface DeleteFileRepository {
  delete: (data: DeleteFolderData) => Promise<boolean>
}
