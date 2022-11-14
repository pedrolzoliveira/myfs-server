import { PrismaClient } from '@prisma/client'
import { IsFileNameAvailble } from '../../domain/use-cases/is-file-name-availble'
import { createPrismaClient } from '../../factories/prisma-client-factory'
import { createFilePrismaRepository } from '../../factories/repositories/file-prisma-repository-factory'
import { createIsFileNameAvailble } from '../../factories/use-cases/is-file-name-availble-factory'

describe('Is File Name Availble Use Case', () => {
  let prismaClient: PrismaClient
  let isFileNameAvailble: IsFileNameAvailble
  let folderId: string
  let isNameAvailble: boolean

  beforeAll(async () => {
    prismaClient = createPrismaClient()
    const fileRepository = createFilePrismaRepository(prismaClient)
    isFileNameAvailble = createIsFileNameAvailble(fileRepository)
    const { id } = await prismaClient.folder.create({
      select: {
        id: true
      },
      data: {
        name: 'any_folder',
        owner: {
          create: {
            name: 'any_name',
            email: 'any_email@mail.com'
          }
        }
      }
    })
    folderId = id
  })

  describe('name is availble', () => {
    beforeAll(async () => {
      isNameAvailble = await isFileNameAvailble.exec({
        name: 'folder_name',
        folderId
      })
    })

    it('returns true', () => {
      expect(isNameAvailble).toBe(true)
    })
  })

  describe('name is not availble', () => {
    beforeAll(async () => {
      await prismaClient.file.create({
        data: {
          name: 'futebol',
          location: 'lmao',
          folder: {
            connect: {
              id: folderId
            }
          }
        }
      })
      isNameAvailble = await isFileNameAvailble.exec({
        folderId,
        name: 'futebol'
      })
    })

    it('returns false', () => {
      expect(isNameAvailble).toBe(false)
    })
  })
})
