import { Folder } from '../domain/model/folder'

export interface CreateFolderData {
  name: string
  userId: string
  parentId?: string
}

export interface CreateFolderRepository {
  createFolder: (data: CreateFolderData) => Promise<Folder>
}
