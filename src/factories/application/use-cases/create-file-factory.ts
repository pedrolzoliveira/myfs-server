import { CreateFile } from '../../../application/use-cases/create-file'
import { Factory } from '../../factory'
import { FilePrismaRepositoryFactory } from '../../infra/repositories/file-prisma-repository-factory'

export const CreateFileFactory: Factory<CreateFile> = {
  async create() {
    return new CreateFile(
      await FilePrismaRepositoryFactory.create()
    )
  }
}
