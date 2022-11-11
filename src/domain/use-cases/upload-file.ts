import { File } from '../model/file'

export interface UploadFileData {
  name: string
  folderId: string
  path: string
}

export interface UploadFile {
  exec: (data: UploadFileData) => Promise<File>
}
