import { CreateFolderRepository } from '../../data/create-folder-repository'
import { FindUserRepository } from '../../data/find-user-repository'
import { Folder } from '../model/folder'

export interface CreateFolderData {
  name: string
  userId: string
  parentId?: string
}

export interface CreateFolder {
  readonly createFolderRepository: CreateFolderRepository
  readonly findUserRepository: FindUserRepository
  exec: (data: CreateFolderData) => Promise<Folder>
}
