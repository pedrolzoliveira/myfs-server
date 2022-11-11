import { PrismaClient } from '@prisma/client'
import { FolderPrismaRepository } from '../../infra/database/repositories/folder-prisma-resitory'

export function createFolderPrismaRepository(prismaClient: PrismaClient) {
  return new FolderPrismaRepository(prismaClient)
}
