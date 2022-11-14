import { IsFileNameAvailble as IIsFileNameAvailble, IsFileNameAvailbleData } from '../../domain/use-cases/is-file-name-availble'
import { FindFileRepository } from '../../data/find-file-repository'

export class IsFileNameAvailble implements IIsFileNameAvailble {
  constructor(
    private readonly findFileRepository: FindFileRepository
  ) {}

  async exec(data: IsFileNameAvailbleData) {
    const file = await this.findFileRepository.find({ name: data.name, folderId: data.folderId })
    return !file
  }
}
