import { Folder } from '../model/folder'

export interface MoveFolderData {
  id: string
  userId: string
  parentId: string
}

export interface MoveFolder {
  exec: (data: MoveFolderData) => Promise<Folder>
}
