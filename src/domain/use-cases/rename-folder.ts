import { Folder } from '../model/folder'

export interface RenameFolderData {
  id: string
  name: string
}

export interface RenameFolder {
  exec: (data: RenameFolderData) => Promise<Folder>
}
