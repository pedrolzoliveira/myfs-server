import { GetFolder as IGetFolder, GetFolderData } from '../../domain/use-cases/get-folder'
import { FolderPrismaRepository } from '../../infra/database/repositories/folder-prisma-resitory'

export class GetFolder implements IGetFolder {
  constructor (
    readonly folderRepository: FolderPrismaRepository
  ) {}

  exec(data: GetFolderData) {
    if (data.id) {
      return this.folderRepository.find({ id: data.id })
    }
    return this.folderRepository.findAll({})
  }
}
