import { PrismaClient } from '@prisma/client'
import { PermissionError } from '../../application/errors/permission-error'
import { SameNameError } from '../../application/errors/same-name-error'
import { Folder } from '../../domain/model/folder'
import { RenameFolder } from '../../domain/use-cases/rename-folder'
import { createPrismaClient } from '../../factories/prisma-client-factory'
import { createFolderPrismaRepository } from '../../factories/repositories/folder-prisma-repository-factory'
import { createUserPrismaRepository } from '../../factories/repositories/user-prisma-repository'
import { createIsNameAvailble } from '../../factories/use-cases/is-name-availble-factory'
import { createRenameFolder } from '../../factories/use-cases/rename-folder-factory'
import { createUserHasFolderPermission } from '../../factories/use-cases/user-has-folder-permission-factory'

describe('Rename Folder Use Case', () => {
  let renameFolder: RenameFolder
  let prismaClient: PrismaClient
  let userId: string

  beforeAll(async () => {
    prismaClient = createPrismaClient()
    const folderRepo = createFolderPrismaRepository(prismaClient)
    const userRepo = createUserPrismaRepository(prismaClient)
    const isNameAvailble = createIsNameAvailble(folderRepo)
    const userHasFolderPermission = createUserHasFolderPermission(userRepo, folderRepo)
    renameFolder = createRenameFolder(folderRepo, isNameAvailble, userHasFolderPermission)

    const user = await prismaClient.user.create({
      data: {
        name: 'owner',
        email: 'the_owner@mail.com'
      }
    })

    userId = user.id
  })

  describe('renames the folder', () => {
    let folderReturn: Folder

    beforeAll(async () => {
      const parentFolder = await prismaClient.folder.create({
        data: {
          userId,
          name: 'parent folder'
        }
      })

      const folder = await prismaClient.folder.create({
        data: {
          userId,
          name: 'my old name',
          parentId: parentFolder.id
        }
      })

      folderReturn = await renameFolder.exec({
        userId,
        id: folder.id,
        name: 'my new name'
      })
    })

    it('saves the new name', () => {
      expect(folderReturn.name).toBe('my new name')
    })
  })

  describe('tries to rename a folder with an already existing name', () => {
    let folderPromise: Promise<Folder>

    beforeAll(async () => {
      const parentFolder = await prismaClient.folder.create({
        data: {
          userId,
          name: 'parent folder 2'
        }
      })

      await prismaClient.folder.create({
        data: {
          userId,
          name: 'name already used',
          parentId: parentFolder.id
        }
      })
      const folder = await prismaClient.folder.create({
        data: {
          userId,
          name: 'my old name',
          parentId: parentFolder.id
        }
      })

      folderPromise = renameFolder.exec({
        userId,
        id: folder.id,
        name: 'name already used'
      })
    })

    it('throws', () => {
      expect(folderPromise).rejects.toThrowError(SameNameError)
    })
  })

  describe('tries to rename a folder that you do not own', () => {
    let folderPromise: Promise<Folder>

    beforeAll(async () => {
      const otherFolder = await prismaClient.folder.create({
        data: {
          name: 'my folder',
          owner: {
            create: {
              name: 'other user',
              email: 'othermail@mail.com'
            }
          }
        }
      })

      folderPromise = renameFolder.exec({
        userId,
        id: otherFolder.id,
        name: 'my cool name'
      })
    })
    it('throws', () => {
      expect(folderPromise).rejects.toThrowError(PermissionError)
    })
  })
})
