import { CreateFolder as ICreateFolder, CreateFolderData } from '../../domain/use-cases/create-folder'
import { FolderPrismaRepository } from '../../infra/database/repositories/folder-prisma-resitory'

export class CreateFolder implements ICreateFolder {
  constructor(
    readonly createFolderRepository: FolderPrismaRepository
  ) {}

  exec(data: CreateFolderData) {
    return this.createFolderRepository.createFolder(data)
  }
}
