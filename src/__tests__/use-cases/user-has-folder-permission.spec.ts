import { PrismaClient } from '@prisma/client'
import { EmptyResultError } from '../../application/errors/empty-result-error'
import { Folder } from '../../domain/model/folder'
import { User } from '../../domain/model/user'
import { UserHasFolderPermission } from '../../domain/use-cases/user-has-folder-permission'
import { createFolderPrismaRepository } from '../../factories/repositories/folder-prisma-repository-factory'
import { createPrismaClient } from '../../factories/prisma-client-factory'
import { createUserHasFolderPermission } from '../../factories/use-cases/user-has-folder-permission-factory'
import { createUserPrismaRepository } from '../../factories/repositories/user-prisma-repository'

describe.only('User Has Folder Permission Use Case', () => {
  let userHasFolderPermission: UserHasFolderPermission
  let prismaClient: PrismaClient
  let user: User

  beforeAll(async () => {
    prismaClient = createPrismaClient()

    userHasFolderPermission = createUserHasFolderPermission(
      createUserPrismaRepository(prismaClient),
      createFolderPrismaRepository(prismaClient)
    )

    user = await prismaClient.user.create({
      data: {
        name: 'I have a folder',
        email: 'lmao@mail.com'
      }
    })
  })

  describe('user has rights over the folder', () => {
    let folder: Folder
    let hasPermission: boolean
    beforeAll(async() => {
      folder = await prismaClient.folder.create({
        data: {
          name: 'my folder',
          userId: user.id as string
        }
      })

      hasPermission = await userHasFolderPermission.exec({ folderId: folder.id as string, userId: user.id as string })
    })

    it('returns true', () => {
      expect(hasPermission).toBe(true)
    })
  })

  describe("user doesn't have rights over the folder", () => {
    let anotherUser: User
    let folder: Folder
    let hasPermission: boolean
    beforeAll(async() => {
      anotherUser = await prismaClient.user.create({
        data: {
          name: 'I dont have a folder',
          email: 'sad@mail.com'
        }
      })
      folder = await prismaClient.folder.create({
        data: {
          name: 'my folder',
          userId: user.id as string
        }
      })

      hasPermission = await userHasFolderPermission.exec({ folderId: folder.id as string, userId: anotherUser.id as string })
    })

    it('returns false', () => {
      expect(hasPermission).toBe(false)
    })
  })

  describe('tries to see the permission of an inexisting user and folder', () => {
    it('throws an error', () => {
      expect(async () => {
        await userHasFolderPermission.exec({ folderId: 'lmao i dont exits', userId: 'lmao neither do i' })
      }).rejects.toThrowError(EmptyResultError)
    })
  })
})
