import { PrismaClient } from '@prisma/client'
import { UserPrismaRepository } from '../../infra/database/repositories/user-prisma-repository'

export function createUserPrismaRepository(prismaClient: PrismaClient) {
  return new UserPrismaRepository(prismaClient)
}
