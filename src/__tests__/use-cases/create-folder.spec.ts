import { Folder } from '../../domain/model/folder'
import { CreateFolder } from '../../domain/use-cases/create-folder'
import { createCreateFolder } from '../../factories/create-folder-factory'
import { createFolderPrismaRepository } from '../../factories/folder-prisma-repository-factory'
import { createPrismaClient } from '../../factories/prisma-client-factory'

describe('Create Folder Use Case', () => {
  let createFolder: CreateFolder

  beforeAll(async () => {
    const prismaClient = createPrismaClient()
    prismaClient.folder.deleteMany()
    createFolder = createCreateFolder(createFolderPrismaRepository(prismaClient))
  })

  describe('creates a folder', () => {
    let folder: Folder

    beforeAll(async () => {
      folder = await createFolder.exec({ name: 'toninho bandeira' })
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
      const parentFolder = await createFolder.exec({ name: 'parent folder' })
      parentFolderId = parentFolder.id as string
    })

    describe('creates a children folder', () => {
      let folder: Folder

      beforeAll(async() => {
        folder = await createFolder.exec({ name: 'children folder', parentId: parentFolderId })
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
            parentId: 'lmao i dont exists hahahah'
          })
        }).rejects.toThrowError()
      })
    })
  })
})
