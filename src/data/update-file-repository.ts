import { File } from '../domain/model/file'

export interface UpdateFileData {
  id: string
  name?: string
  folderId?: string
}

export interface UpdateFileRepository {
  update: (data: UpdateFileData) => Promise<File>
}
