import { CountFileRepository } from '../../../data/count-file-repository'
import { CreateFileRepository } from '../../../data/create-file-repository'
import { DeleteFileRepository } from '../../../data/delete-file-repository'
import { FindFileRepository } from '../../../data/find-file-repository'
import { UpdateFileRepository } from '../../../data/update-file-repository'
import { FilePrismaRepository } from '../../../infra/database/repositories/file-prisma-repository'
import { Factory } from '../../factory'
import { PrismaClientFactory } from '../prisma-client-factory'

export const FilePrismaRepositoryFactory: Factory<CreateFileRepository & FindFileRepository & CountFileRepository & UpdateFileRepository & DeleteFileRepository> = {
  async create() {
    return new FilePrismaRepository(
      await PrismaClientFactory.create()
    )
  }
}
