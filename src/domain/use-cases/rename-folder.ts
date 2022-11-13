import { Folder } from '../model/folder'

export interface RenameFolderData {
  userId: string
  id: string
  name: string
}

export interface RenameFolder {
  exec: (data: RenameFolderData) => Promise<Folder>
}
