import { FindAllFolderRepository } from '../../data/find-all-folder-repository'
import { FindFolderRepository } from '../../data/find-folder-repository'
import { GetFolder as IGetFolder, GetFolderData } from '../../domain/use-cases/get-folder'

export class GetFolder implements IGetFolder {
  constructor (
    readonly folderRepository: FindFolderRepository & FindAllFolderRepository
  ) {}

  async exec(data: GetFolderData) {
    if (data.id) {
      return await this.folderRepository.find({ id: data.id })
    }
    return await this.folderRepository.findAll({})
  }
}
