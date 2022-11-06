import { Server } from '../infra/http/express/server'
import { createApplicationRoutes } from './application-routes-factory'
import { createCreateFolder } from './create-folder-factory'
import { createFolderController } from './folder-controller-factory'
import { createFolderPrismaRepository } from './folder-prisma-repository-factory'
import { createGetFolder } from './get-folder-factory'
import { createPrismaClient } from './prisma-client-factory'

export function createServer() {
  const prismaClient = createPrismaClient()

  const folderRepository = createFolderPrismaRepository(prismaClient)

  const createFolderUseCase = createCreateFolder(folderRepository)
  const getFolderUseCase = createGetFolder(folderRepository)

  const folderController = createFolderController(createFolderUseCase, getFolderUseCase)

  const applicationRoutes = createApplicationRoutes(folderController)

  return new Server(applicationRoutes.route)
}
