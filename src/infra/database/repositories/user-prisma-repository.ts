import { PrismaClient } from '@prisma/client'
import { CreateUserData, CreateUserRepository } from '../../../data/create-user-repository'

export class UserPrismaRepository implements CreateUserRepository {
  constructor(
    private readonly prismaClient: PrismaClient
  ) {}

  createUser(data: CreateUserData) {
    return this.prismaClient.user.create({ data })
  }
}
