import { Folder } from '../domain/model/folder'

export interface FindFolderData {
  id?: string
  name?: string
  parentId?: string | null
  userId?: string
}

export interface FindFolderRepository {
  find: (data: FindFolderData) => Promise<Folder | null>
}
