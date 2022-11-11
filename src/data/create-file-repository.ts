import { File } from '../domain/model/file'

export interface CreateFileData {
  name: string
  folderId: string
  path: string
}

export interface CreateFileRepository {
  create: (data: CreateFileData) => Promise<File>
}
