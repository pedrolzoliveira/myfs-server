import { CreateFile } from '../../application/use-cases/create-file'
import { CreateFileRepository } from '../../data/create-file-repository'

export function createCreateFile(fileRepository: CreateFileRepository) {
  return new CreateFile(fileRepository)
}
