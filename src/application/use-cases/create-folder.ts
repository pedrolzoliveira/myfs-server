import { CreateFolderRepository } from '../../data/create-folder-repository'
import { ForeignKeyConstraintError } from '../../data/errors/foreign-key-constraint-error'
import { FindUserRepository } from '../../data/find-user-repository'
import { CreateFolder as ICreateFolder, CreateFolderData } from '../../domain/use-cases/create-folder'

export class CreateFolder implements ICreateFolder {
  constructor(
    readonly createFolderRepository: CreateFolderRepository,
    readonly findUserRepository: FindUserRepository
  ) {}

  async exec(data: CreateFolderData) {
    const user = await this.findUserRepository.find({ id: data.userId })
    if (!user) {
      throw new ForeignKeyConstraintError('Folder', 'userId', 'User')
    }
    return await this.createFolderRepository.createFolder(data)
  }
}
