import { FindAllFolderRepository } from '../../data/find-all-folder-repository'
import { FindFolderRepository } from '../../data/find-folder-repository'
import { Folder } from '../model/folder'

export interface GetFolderData {
  id?: string
  parentId?: string
}

export interface GetFolder {
  readonly folderRepository: FindFolderRepository & FindAllFolderRepository
  exec: (data: GetFolderData) => Promise<Folder | Folder[] | null>
}
