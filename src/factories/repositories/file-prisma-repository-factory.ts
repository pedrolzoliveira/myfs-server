import { PrismaClient } from '@prisma/client'
import { FilePrismaRepository } from '../../infra/database/repositories/file-prisma-repository'

export function createFilePrismaRepository(prismaClient: PrismaClient) {
  return new FilePrismaRepository(prismaClient)
}
