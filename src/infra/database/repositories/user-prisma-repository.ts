import { Prisma, PrismaClient } from '@prisma/client'
import { CreateUserData, CreateUserRepository } from '../../../data/create-user-repository'
import { UniqueConstraintError } from '../../../data/errors/unique-constraint-error'

export class UserPrismaRepository implements CreateUserRepository {
  constructor(
    private readonly prismaClient: PrismaClient
  ) {}

  async createUser(data: CreateUserData) {
    try {
      return await this.prismaClient.user.create({ data })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') throw new UniqueConstraintError('User', 'email')
      }
      throw e
    }
  }
}
