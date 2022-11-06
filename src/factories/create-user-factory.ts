import { CreateUser } from '../application/use-cases/create-user'
import { UserPrismaRepository } from '../infra/database/repositories/user-prisma-repository'

export function createCreateUser(userPrismaRepository: UserPrismaRepository) {
  return new CreateUser(userPrismaRepository)
}
