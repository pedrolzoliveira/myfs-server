import { File } from '../model/file'

export interface RenameFileData {
  userId: string
  id: string
  name: string
}

export interface RenameFile {
  exec: (data: RenameFileData) => Promise<File>
}
