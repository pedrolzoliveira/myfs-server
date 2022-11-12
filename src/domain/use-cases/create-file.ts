import { File } from '../model/file'

export interface CreateFileData {
  name: string
  folderId: string
  location: string
}

export interface CreateFile {
  exec: (data: CreateFileData) => Promise<File>
}
