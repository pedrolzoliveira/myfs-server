export interface PrepareDeleteFileData {
  id: string
  userId: string
}

export interface PrepareDeleteFile {
  exec: (data: PrepareDeleteFileData) => Promise<boolean>
}
