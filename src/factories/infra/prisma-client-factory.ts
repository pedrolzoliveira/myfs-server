import { PrismaClient } from '@prisma/client'
import { Factory } from '../factory'

let prismaClient: PrismaClient

export const PrismaClientFactory: Factory<PrismaClient> = {
  async create() {
    if (!prismaClient) {
      prismaClient = new PrismaClient()
    }
    return prismaClient
  }
}
