import { Folder } from '../domain/model/folder'

export interface FindAllData {
  id?: string
}

export interface FindAllFolderRepository {
  findAll: (data: FindAllData) => Promise<Folder[]>
}
