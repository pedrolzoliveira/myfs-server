import { CreateUserRepository } from '../../../data/create-user-repository'
import { FindUserRepository } from '../../../data/find-user-repository'
import { UserPrismaRepository } from '../../../infra/database/repositories/user-prisma-repository'
import { Factory } from '../../factory'
import { PrismaClientFactory } from '../prisma-client-factory'

export const UserPrismaRepositoryFactory: Factory<CreateUserRepository & FindUserRepository> = {
  async create() {
    return new UserPrismaRepository(
      await PrismaClientFactory.create()
    )
  }
}
