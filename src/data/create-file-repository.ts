import { File } from '../domain/model/file'

export interface CreateFileData {
  name: string
  folderId: string
  location: string
}

export interface CreateFileRepository {
  create: (data: CreateFileData) => Promise<File>
}
