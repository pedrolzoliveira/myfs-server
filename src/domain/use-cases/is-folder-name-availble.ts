export interface IsFolderNameAvailbleData {
  name: string
  parentFolderId: string
}

export interface IsFolderNameAvailble {
  exec: (data: IsFolderNameAvailbleData) => Promise<boolean>
}
