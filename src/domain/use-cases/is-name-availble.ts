export interface IsNameAvailbleData {
  name: string
  parentFolderId: string
}

export interface IsNameAvailble {
  exec: (data: IsNameAvailbleData) => Promise<boolean>
}
