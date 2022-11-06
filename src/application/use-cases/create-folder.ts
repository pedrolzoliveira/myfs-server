import { CreateFolderRepository } from '../../data/create-folder-repository'
import { CreateFolder as ICreateFolder, CreateFolderData } from '../../domain/use-cases/create-folder'

export class CreateFolder implements ICreateFolder {
  constructor(
    readonly createFolderRepository: CreateFolderRepository
  ) {}

  async exec(data: CreateFolderData) {
    return await this.createFolderRepository.createFolder(data)
  }
}
