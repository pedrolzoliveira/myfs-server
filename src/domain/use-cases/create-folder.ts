import { CreateFolderRepository } from '../../data/create-folder-repository'
import { Folder } from '../model/folder'

export interface CreateFolderData {
  name: string
  parentId?: string
}

export interface CreateFolder {
  readonly createFolderRepository: CreateFolderRepository
  exec: (data: CreateFolderData) => Promise<Folder>
}
