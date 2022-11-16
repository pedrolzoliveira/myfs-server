import { IsFileNameAvailble } from '../../../application/use-cases/is-file-name-availble'
import { Factory } from '../../factory'
import { FilePrismaRepositoryFactory } from '../../infra/repositories/file-prisma-repository-factory'

export const IsFileNameAvailbleFactory: Factory<IsFileNameAvailble> = {
  async create() {
    return new IsFileNameAvailble(
      await FilePrismaRepositoryFactory.create()
    )
  }
}
