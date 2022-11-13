import { Folder } from '../model/folder'

export interface GetFolderData {
  id?: string
  parentId?: string
  userId: string
}

export interface GetFolder {
  exec: (data: GetFolderData) => Promise<Folder | Folder[] | null>
}
