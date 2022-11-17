export interface DeleteFile {
  exec: (location: string) => Promise<boolean>
}
