import { CreateFile } from '../../application/use-cases/create-file'
import { CountFileRepository } from '../../data/count-file-repository'
import { CreateFileRepository } from '../../data/create-file-repository'
import { FindFileRepository } from '../../data/find-file-repository'

export function createCreateFile(fileRepository: CreateFileRepository & FindFileRepository & CountFileRepository) {
  return new CreateFile(fileRepository)
}
