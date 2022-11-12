export interface CountData {
  name?: string
  folderId?: string
}

export interface CountFileRepository {
  count: (data: CountData) => Promise<number>
}
