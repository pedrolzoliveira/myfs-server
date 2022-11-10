import { Prisma, PrismaClient } from '@prisma/client'
import { CreateUserData, CreateUserRepository } from '../../../data/create-user-repository'
import { UniqueConstraintError } from '../../../data/errors/unique-constraint-error'
import { FindUserData, FindUserRepository } from '../../../data/find-user-repository'

export class UserPrismaRepository implements CreateUserRepository, FindUserRepository {
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

  async find(data: FindUserData) {
    return this.prismaClient.user.findUnique({ where: { ...data } })
  }
}
