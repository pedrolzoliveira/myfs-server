import { Server } from '../infra/http/express/server'
import { createPrismaClient } from './prisma-client-factory'
import { createFolderPrismaRepository } from './repositories/folder-prisma-repository-factory'
import { createUserPrismaRepository } from './repositories/user-prisma-repository'
import { createAuthenticator } from './authenticator-factory'
import { createCreateFolder } from './use-cases/create-folder-factory'
import { createCreateUser } from './use-cases/create-user-factory'
import { createGetFolder } from './use-cases/get-folder-factory'
import { createSignIn } from './use-cases/sign-in-factory'
import { createErrorHandler } from './error-handler-factory'
import { createFolderController } from './controllers/folder-controller-factory'
import { createUserController } from './controllers/user-controller-factory'
import { createApplicationRoutes } from './application-routes-factory'
import { createUserHasFolderPermission } from './use-cases/user-has-folder-permission-factory'
import { createFileController } from './controllers/file-controller-factory'
import { createCreateFile } from './use-cases/create-file-factory'
import { createFilePrismaRepository } from './repositories/file-prisma-repository-factory'
import { createUploadHandler } from './upload-handler-factory'

export function createServer() {
  const prismaClient = createPrismaClient()
  const authenticator = createAuthenticator()

  const folderRepository = createFolderPrismaRepository(prismaClient)
  const userRepository = createUserPrismaRepository(prismaClient)
  const fileRepository = createFilePrismaRepository(prismaClient)

  const getFolderUseCase = createGetFolder(folderRepository)
  const userHasFolderPermission = createUserHasFolderPermission(userRepository, folderRepository)
  const createUser = createCreateUser(userRepository)
  const signIn = createSignIn(userRepository)
  const createFolderUseCase = createCreateFolder(folderRepository, userRepository, userHasFolderPermission)
  const createFileUseCase = createCreateFile(fileRepository)

  const folderController = createFolderController(createFolderUseCase, getFolderUseCase)
  const userController = createUserController(createUser, signIn)
  const fileController = createFileController(userHasFolderPermission, createFileUseCase)

  const uploadHanlder = createUploadHandler()

  const applicationRoutes = createApplicationRoutes(authenticator, folderController, userController, fileController, uploadHanlder)

  const errorHandler = createErrorHandler()

  return new Server(applicationRoutes.route, errorHandler)
}
