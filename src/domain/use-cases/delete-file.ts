export interface DeleteFileData {
  userId: string
  id: string

}

export interface DeleteFile {
  exec: (data: DeleteFileData) => Promise<boolean>
}
