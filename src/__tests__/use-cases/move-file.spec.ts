import { PrismaClient } from '@prisma/client'
import { PermissionError } from '../../application/errors/permission-error'
import { MoveFile } from '../../domain/use-cases/move-file'
import { MoveFileFactory } from '../../factories/application/use-cases/move-file-factory'
import { PrismaClientFactory } from '../../factories/infra/prisma-client-factory'
import { File } from '../../domain/model/file'
import { SameNameError } from '../../application/errors/same-name-error'

describe('Move File Use Case', () => {
  let moveFile: MoveFile
  let prismaClient: PrismaClient
  let userId: string
  let folderIds: string[]
  beforeAll(async() => {
    prismaClient = await PrismaClientFactory.create()
    moveFile = await MoveFileFactory.create()
    const user = await prismaClient.user.create({
      select: {
        id: true,
        folders: true
      },
      data: {
        name: 'PedroOliveira',
        email: 'my_email2@gmail.com',
        folders: {
          create: [
            { name: 'folder1' },
            { name: 'folder2' }
          ]
        }
      }
    })
    userId = user.id
    folderIds = user.folders.map(folder => folder.id)
  })

  describe('moves a file to another folder', () => {
    let fileId: string
    beforeAll(async () => {
      const file = await prismaClient.file.create({
        data: {
          name: 'my_file',
          location: 'amazon/something',
          folder: {
            connect: {
              id: folderIds[0]
            }
          }
        }
      })
      fileId = file.id
      await moveFile.exec({ userId, folderId: folderIds[1], id: fileId })
    })

    it('moves the file to the other folder', async () => {
      const file = await prismaClient.file.findUnique({
        select: {
          folderId: true
        },
        where: { id: fileId }
      })
      expect(file?.folderId).toBe(folderIds[1])
    })
  })

  describe('tries to move a file that has already the file name in the folder used', () => {
    let moveFilePromise: Promise<File>
    beforeAll(async() => {
      const file = await prismaClient.file.create({
        data: {
          name: 'my_file',
          location: 'amazon/something',
          folder: {
            connect: {
              id: folderIds[0]
            }
          }
        }
      })

      moveFilePromise = moveFile.exec({ userId, folderId: folderIds[1], id: file.id })
    })

    it('throws', () => {
      expect(moveFilePromise).rejects.toThrowError(SameNameError)
    })
  })

  describe('tries to move a file without the right permissions', () => {
    let moveFilePromise: Promise<File>
    beforeAll(async() => {
      const otherUser = await prismaClient.user.create({
        select: {
          id: true,
          folders: true
        },
        data: {
          name: 'The other user',
          email: 'notmyemail@gmail.com',
          folders: {
            create: [
              { name: 'folder1' },
              { name: 'folder2' }
            ]
          }
        }
      })
      const otherFolderIds = otherUser.folders.map(folder => folder.id)
      const notMyFile = await prismaClient.file.create({
        data: {
          name: 'lmao any_fil',
          location: 'lol',
          folder: {
            connect: {
              id: otherFolderIds[0]
            }
          }
        }
      })
      moveFilePromise = moveFile.exec({ userId, id: notMyFile.id, folderId: otherFolderIds[1] })
    })

    it('throws', () => {
      expect(moveFilePromise).rejects.toThrowError(PermissionError)
    })
  })
})
