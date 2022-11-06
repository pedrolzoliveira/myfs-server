import { UpdateFolderRepository } from '../../data/update-folder-repository'
import { Folder } from '../model/folder'

export interface RenameFolderData {
  id: string
  name: string
}

export interface RenameFolder {
  updateFolderRepository: UpdateFolderRepository
  exec: (data: RenameFolderData) => Promise<Folder>
}
