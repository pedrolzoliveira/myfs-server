import { IsFolderNameAvailble as IIsFolderNameAvailble, IsFolderNameAvailbleData } from '../../domain/use-cases/is-folder-name-availble'
import { FindFolderRepository } from '../../data/find-folder-repository'
export class IsFolderNameAvailble implements IIsFolderNameAvailble {
  constructor(
    private readonly findFolderRepository: FindFolderRepository
  ) {}

  async exec(data: IsFolderNameAvailbleData) {
    const folder = await this.findFolderRepository.find({ name: data.name, parentId: data.parentFolderId })
    return !folder
  }
}
