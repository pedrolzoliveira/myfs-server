import { DeleteFile } from '../../domain/use-cases/delete-file'
import { createPrismaClient } from '../../factories/prisma-client-factory'
import { createFilePrismaRepository } from '../../factories/repositories/file-prisma-repository-factory'
import { createFolderPrismaRepository } from '../../factories/repositories/folder-prisma-repository-factory'
import { createUserPrismaRepository } from '../../factories/repositories/user-prisma-repository'
import { createDeleteFile } from '../../factories/use-cases/delete-file-factory'
import { createUserHasFilePermission } from '../../factories/use-cases/user-has-file-permission-factory'
import { writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { PrismaClient } from '@prisma/client'
import { File } from '../../domain/model/file'
import { EmptyResultError } from '../../application/errors/empty-result-error'
import { PermissionError } from '../../application/errors/permission-error'
import path from 'path'

describe('Delete File Use Case', () => {
  let prismaClient: PrismaClient
  let deleteFile: DeleteFile
  let userId: string
  beforeAll(async () => {
    prismaClient = createPrismaClient()

    const fileRepo = createFilePrismaRepository(prismaClient)
    const userRepo = createUserPrismaRepository(prismaClient)
    const folderRepo = createFolderPrismaRepository(prismaClient)

    const userHasFilePermission = createUserHasFilePermission(userRepo, fileRepo, folderRepo)

    deleteFile = createDeleteFile(userHasFilePermission, fileRepo)

    const { id } = await prismaClient.user.create({
      data: {
        name: 'owner',
        email: 'owner_email@mail.com.br'
      }
    })

    userId = id
  })

  describe('creates the file', () => {
    let file: File & { id: string }

    beforeAll(async() => {
      const filePath = path.join(process.env.MULTER_DEST_TEST as string, 'testfile')
      const [file_] = await Promise.all([
        prismaClient.file.create({
          data: {
            name: 'testfile',
            location: filePath,
            folder: {
              create: {
                name: 'testfolder',
                owner: {
                  connect: {
                    id: userId
                  }
                }
              }
            }
          }
        }),
        writeFile(filePath, 'Im a dummy file')

      ])
      file = file_
    })

    it('creates the file', () => {
      expect(existsSync(file.location)).toBe(true)
    })

    describe('deletes the file', () => {
      beforeAll(async () => {
        await deleteFile.exec({
          id: file.id,
          userId
        })
      })

      it('deletes the file from the fs', () => {
        expect(existsSync(file.location)).toBe(false)
      })

      it('deletes the file from the database', async () => {
        const file_ = await prismaClient.file.findUnique({ where: { id: file.id } })
        expect(file_).toBe(null)
      })
    })
  })

  describe('tries to delete a file that does not exists', () => {
    it('throws', () => {
      expect(async () => {
        await deleteFile.exec({
          id: 'lmao',
          userId
        })
      }).rejects.toThrowError(EmptyResultError)
    })
  })

  describe('tries to delete a file that you dont have the permission', () => {
    let fileId: string
    beforeAll(async() => {
      const file = await prismaClient.file.create({
        data: {
          name: 'file_i_do_not_own',
          location: 'doesnotmetter',
          folder: {
            create: {
              name: 'lmao',
              owner: {
                create: {
                  name: 'lamo',
                  email: 'notwaythathappen@mail.com'
                }
              }
            }
          }
        }
      })
      fileId = file.id
    })

    it('throws', () => {
      expect(async() => {
        await deleteFile.exec({
          id: fileId,
          userId
        })
      }).rejects.toThrowError(PermissionError)
    })
  })

  describe('rollbacks if an error occurs', () => {
    let fileId: string
    let deleted: boolean
    beforeAll(async() => {
      const file = await prismaClient.file.create({
        data: {
          name: 'file_i_do_own',
          location: 'doesnotmetter',
          folder: {
            create: {
              name: 'lmao',
              owner: {
                connect: {
                  id: userId
                }
              }
            }
          }
        }
      })
      fileId = file.id

      deleted = await deleteFile.exec({
        id: file.id,
        userId
      })
    })

    it('throws', () => {
      expect(deleted).toBe(false)
    })

    it('database file still exists', async () => {
      const file_ = await prismaClient.file.findUnique({ where: { id: fileId } })
      expect(file_).toBeTruthy()
    })
  })
})
