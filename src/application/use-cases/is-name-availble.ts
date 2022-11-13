import { IsNameAvailble as IIsNameAvailble, IsNameAvailbleData } from '../../domain/use-cases/is-name-availble'
import { FindFolderRepository } from '../../data/find-folder-repository'
export class IsNameAvailble implements IIsNameAvailble {
  constructor(
    private readonly findFolderRepository: FindFolderRepository
  ) {}

  async exec(data: IsNameAvailbleData) {
    const folder = await this.findFolderRepository.find({ name: data.name, parentId: data.parentFolderId })
    return !folder
  }
}
