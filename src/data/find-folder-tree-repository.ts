import { Folder } from '../domain/model/folder'
import { File } from '../domain/model/file'

export type FolderTree = Folder & {
  folders: FolderTree[]
  files: File[]
}

export interface FindFolderTreeRepository {
  getTree: (id: string) => Promise<FolderTree>
}
