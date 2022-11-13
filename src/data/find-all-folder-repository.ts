import { Folder } from '../domain/model/folder'

export interface FindAllData {
  userId?: string
  name?: string
  parentId?: string | null
}

export interface FindAllFolderRepository {
  findAll: (data: FindAllData) => Promise<Folder[]>
}
