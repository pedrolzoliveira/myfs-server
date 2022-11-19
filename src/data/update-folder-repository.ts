import { Folder } from '../domain/model/folder'

export interface UpdateFolderData {
  id: string
  name?: string
  parentId?: string
}

export interface UpdateFolderRepository {
  updateFolder: (data: UpdateFolderData) => Promise<Folder>
}
