import { File } from '../domain/model/file'

export interface FindData {
  id?: string
  name?: string
  folderId?: string
  count?: boolean
}

export interface FindFileRepository {
  find: (data: FindData) => Promise<File | null>
}
