import { Folder } from '../model/folder'

export interface CreateFolderData {
  name: string
  userId: string
  parentId?: string
}

export interface CreateFolder {
  exec: (data: CreateFolderData) => Promise<Folder>
}
