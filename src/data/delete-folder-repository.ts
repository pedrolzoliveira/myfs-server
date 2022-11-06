interface DeleteFolderData {
  id: string
}

export interface DeleteFolderRepository {
  deleteFolder: (data: DeleteFolderData) => Promise<boolean>
}
