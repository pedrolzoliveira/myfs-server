import { File } from '../model/file'

export interface MoveFileData {
  id: string
  userId: string
  folderId: string
}

export interface MoveFile {
  exec: (data: MoveFileData) => Promise<File>
}
