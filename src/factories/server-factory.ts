import { Server } from '../infra/http/express/server'
import { createApplicationRoutes } from './application-routes-factory'
import { createCreateFolder } from './create-folder-factory'
import { createCreateUser } from './create-user-factory'
import { createErrorHandler } from './error-handler-factory'
import { createFolderController } from './folder-controller-factory'
import { createFolderPrismaRepository } from './folder-prisma-repository-factory'
import { createGetFolder } from './get-folder-factory'
import { createPrismaClient } from './prisma-client-factory'
import { createUserController } from './user-controller-factory'
import { createUserPrismaRepository } from './user-prisma-repository'

export function createServer() {
  const prismaClient = createPrismaClient()

  const folderRepository = createFolderPrismaRepository(prismaClient)
  const userRepository = createUserPrismaRepository(prismaClient)

  const createFolderUseCase = createCreateFolder(folderRepository)
  const getFolderUseCase = createGetFolder(folderRepository)
  const createUser = createCreateUser(userRepository)

  const folderController = createFolderController(createFolderUseCase, getFolderUseCase)
  const userController = createUserController(createUser)

  const applicationRoutes = createApplicationRoutes(folderController, userController)

  const errorHandler = createErrorHandler()

  return new Server(applicationRoutes.route, errorHandler)
}
