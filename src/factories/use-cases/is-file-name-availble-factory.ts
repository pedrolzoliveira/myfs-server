import { IsFileNameAvailble } from '../../application/use-cases/is-file-name-availble'
import { FindFileRepository } from '../../data/find-file-repository'

export function createIsFileNameAvailble(findFileRepository: FindFileRepository) {
  return new IsFileNameAvailble(findFileRepository)
}
