import { DeleteFolderRepository } from '../../data/delete-folder-repository'
import { DeleteFolder as IDeleteFolder, DeleteFolderData } from '../../domain/use-cases/delete-folder'

export class DeleteFolder implements IDeleteFolder {
  constructor(
    readonly deleteFolderRepository: DeleteFolderRepository
  ) {}

  async exec(data: DeleteFolderData) {
    return await this.deleteFolderRepository.deleteFolder(data)
  }
}
