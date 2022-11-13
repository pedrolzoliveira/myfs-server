export interface IsFileNameAvailbleData {
  name: string
  folderId: string
}

export interface IsFileNameAvailble {
  exec: (data: IsFileNameAvailbleData) => Promise<boolean>
}
