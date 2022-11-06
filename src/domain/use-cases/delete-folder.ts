import { DeleteFolderRepository } from '../../data/delete-folder-repository'

export interface DeleteFolderData {
  id: string
}

export interface DeleteFolder {
  deleteFolderRepository: DeleteFolderRepository
  exec: (data: DeleteFolderData) => Promise<boolean>
}
