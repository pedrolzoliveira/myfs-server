import { CreateUser } from '../../../application/use-cases/create-user'

import { Factory } from '../../factory'
import { UserPrismaRepositoryFactory } from '../../infra/repositories/user-prisma-repository'

export const CreateUserFactory: Factory<CreateUser> = {
  async create() {
    return new CreateUser(
      await UserPrismaRepositoryFactory.create()
    )
  }
}
