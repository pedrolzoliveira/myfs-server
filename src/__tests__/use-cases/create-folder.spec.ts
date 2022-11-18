import { Folder } from '../../domain/model/folder'
import { CreateFolder } from '../../domain/use-cases/create-folder'
import { CreateFolderFactory } from '../../factories/application/use-cases/create-folder-factory'
import { PrismaClientFactory } from '../../factories/infra/prisma-client-factory'
import { User } from '../../domain/model/user'
import { ForeignKeyConstraintError } from '../../data/errors/foreign-key-constraint-error'
import { PrismaClient } from '@prisma/client'
import { PermissionError } from '../../application/errors/permission-error'
import { SameNameError } from '../../application/errors/same-name-error'

describe('Create Folder Use Case', () => {
  let createFolder: CreateFolder
  let user: User
  let prismaClient: PrismaClient

  beforeAll(async () => {
    prismaClient = await PrismaClientFactory.create()

    user = await prismaClient.user.create({ data: { name: 'The folder owner', email: 'the folder stuff' } })

    createFolder = await CreateFolderFactory.create()
  })

  describe('creates a folder', () => {
    let folder: Folder

    beforeAll(async () => {
      folder = await createFolder.exec({ name: 'toninho bandeira', userId: user.id as string })
    })

    it('has an id', () => {
      expect(folder.id).toBeDefined()
    })

    it('has a name', () => {
      expect(folder.name).toBe('toninho bandeira')
    })
  })

  describe('creates a nested folder', () => {
    let parentFolderId: string

    beforeAll(async () => {
      const parentFolder = await createFolder.exec({ name: 'parent folder', userId: user.id as string })
      parentFolderId = parentFolder.id as string
    })

    describe('creates a children folder', () => {
      let folder: Folder

      beforeAll(async() => {
        folder = await createFolder.exec({ name: 'children folder', parentId: parentFolderId, userId: user.id as string })
      })

      it('should have the name right', () => {
        expect(folder.name).toBe('children folder')
      })

      it('should have the parentId right', () => {
        expect(folder.parentId).toBe(parentFolderId)
      })
    })

    describe('tries to create a folder with invalid parentId', () => {
      it('should throw', () => {
        expect(async () => {
          await createFolder.exec({
            name: 'hahahah',
            parentId: 'lmao i dont exists hahahah',
            userId: user.id as string
          })
        }).rejects.toThrowError(ForeignKeyConstraintError)
      })
    })

    describe('tries to create a folder with a name already used in a parent folder', () => {
      it('throws', () => {
        expect(async () => {
          await createFolder.exec({ name: 'children folder', parentId: parentFolderId, userId: user.id as string })
        }).rejects.toThrow(SameNameError)
      })
    })
  })

  describe('tries to create a folder in another user folder', () => {
    let folderId: string
    beforeAll(async () => {
      const newUser = await prismaClient.user.create({
        data: {
          name: 'new user',
          email: 'new_user_email@mail.com'
        }
      })
      const newFolder = await prismaClient.folder.create({
        data: {
          name: 'hahah u dont have access',
          userId: newUser.id
        }
      })
      folderId = newFolder.id
    })

    it('should throw', () => {
      expect(async() => {
        await createFolder.exec({
          name: 'not my folder',
          userId: user.id as string,
          parentId: folderId
        })
      }).rejects.toThrowError(PermissionError)
    })
  })
})
