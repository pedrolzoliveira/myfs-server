import { Folder } from '../domain/model/folder'

export interface FindFolderData {
  id: string
}

export interface FindFolderRepository {
  find: (data: FindFolderData) => Promise<Folder | null>
}
