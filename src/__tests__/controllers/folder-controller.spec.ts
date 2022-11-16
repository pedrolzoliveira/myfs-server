import request, { Response } from 'supertest'
import { Server } from '../../infra/http/express/server'
import { ServerFactory } from '../../factories/infra/server-factory'
import { Folder } from '../../domain/model/folder'
import { PrismaClient } from '@prisma/client'
import { PrismaClientFactory } from '../../factories/infra/prisma-client-factory'

describe('FolderController', () => {
  let server: Server
  let prismaClient: PrismaClient
  let response: Response
  let cookie: string[]

  beforeAll(async () => {
    server = await ServerFactory.create()
    prismaClient = await PrismaClientFactory.create()
  })

  describe('POST /folders', () => {
    beforeAll(async () => {
      await prismaClient.user.create({ data: { name: 'my logged user', email: 'logged_user@mail.com' } })
      const r = await request(server.app).post('/users/sign-in').send({ email: 'logged_user@mail.com' })
      cookie = r.headers['set-cookie']
    })

    describe('2XX', () => {
      describe('creating new folder', () => {
        let folder: Folder

        beforeAll(async () => {
          response = await request(server.app).post('/folders').set('Cookie', cookie).send({ name: 'My folder' })
          folder = response.body.payload.folder
        })

        it('returns the right payload', () => {
          expect(response.body.payload.folder).toStrictEqual(folder)
        })

        it('returns the right message', () => {
          expect(response.body.message).toBe('Folder created successfully')
        })

        it('returns ok true', () => {
          expect(response.body.ok).toBe(true)
        })

        it('returns 201', () => {
          expect(response.statusCode).toBe(201)
        })
      })

      describe('creating a children folder', () => {
        let folder: Folder

        beforeAll(async () => {
          const parentFolderResponse = await request(server.app).post('/folders').set('Cookie', cookie).send({ name: 'My parent folder' })
          const parentFolder: Folder = parentFolderResponse.body.payload.folder

          response = await request(server.app).post('/folders').set('Cookie', cookie).send({ name: 'My children folder', parentId: parentFolder.id })
          folder = response.body.payload.folder
        })

        it('returns the right payload', () => {
          expect(response.body.payload.folder).toStrictEqual(folder)
        })

        it('returns folder with parentId not null', () => {
          expect(response.body.payload.folder.parentId).toBeDefined()
        })

        it('returns the right message', () => {
          expect(response.body.message).toBe('Folder created successfully')
        })

        it('returns ok true', () => {
          expect(response.body.ok).toBe(true)
        })

        it('returns 201', () => {
          expect(response.statusCode).toBe(201)
        })
      })
    })

    describe('4XX', () => {
      describe('tries to create a folder with an empty payload', () => {
        beforeAll(async() => {
          response = await request(server.app).post('/folders').set('Cookie', cookie).send({})
        })

        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })

        it('returns 400', () => {
          expect(response.statusCode).toBe(400)
        })
      })

      describe('tries to create a folder without being logged', () => {
        beforeAll(async () => {
          response = await request(server.app).post('/folders').send({ name: 'Cool folder' })
        })

        it('returns the right message', () => {
          expect(response.body.message).toBe('UNAUTHORIZED')
        })

        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })

        it('returns 401', () => {
          expect(response.statusCode).toBe(401)
        })
      })

      describe('tries to create a folder with an invalid parentId', () => {
        beforeAll(async () => {
          response = await request(server.app).post('/folders').set('Cookie', cookie).send({ name: 'valid name', parentId: 'lmao i dont exist' })
        })

        it('returns the right message', () => {
          expect(response.body.message).toBe("Parent folder doesn't exists.")
        })

        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })

        it('returns a 404', () => {
          expect(response.statusCode).toBe(404)
        })
      })

      describe('tries to create a folder without the right permission', () => {
        beforeAll(async () => {
          const user = await prismaClient.user.create({ data: { name: 'new user', email: 'my_email_doesnt_metter@gmail.com' } })
          const folder = await prismaClient.folder.create({ data: { name: 'My folder that u dont have access', userId: user.id } })

          response = await request(server.app).post('/folders').set('Cookie', cookie).send({ name: 'forbiden children', parentId: folder.id })
        })

        it('returns the right message', () => {
          expect(response.body.message).toBe("You don't have permission over this folder.")
        })

        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })

        it('returns 403', () => {
          expect(response.statusCode).toBe(403)
        })
      })

      describe('tries to create a children folder with a name already being used inside parent folder', () => {
        beforeAll(async () => {
          const parentFolderResponse = await request(server.app).post('/folders').set('Cookie', cookie).send({ name: 'My parent folder' })
          const parentFolder: Folder = parentFolderResponse.body.payload.folder

          await request(server.app).post('/folders').set('Cookie', cookie).send({ name: 'My children folder', parentId: parentFolder.id })
          response = await request(server.app).post('/folders').set('Cookie', cookie).send({ name: 'My children folder', parentId: parentFolder.id })
        })

        it('returns the right message', () => {
          expect(response.body.message).toBe("There's already a folder with this name inside the parent folder.")
        })

        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })

        it('returns 409', () => {
          expect(response.statusCode).toBe(409)
        })
      })
    })
  })

  describe('PUT /folders', () => {
    describe('2XX', () => {})

    describe('4XX', () => {
      describe('tries to create a folder without being logged', () => {
        beforeAll(async () => {
          response = await request(server.app).put('/folders').send({ name: 'does not metter' })
        })

        it('returns the right message', () => {
          expect(response.body.message).toBe('UNAUTHORIZED')
        })

        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })

        it('returns 401', () => {
          expect(response.statusCode).toBe(401)
        })
      })

      describe('tries to create a folder with an empty payload', () => {
        beforeAll(async() => {
          response = await request(server.app).put('/folders').set('Cookie', cookie).send({})
        })

        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })

        it('returns 400', () => {
          expect(response.statusCode).toBe(400)
        })
      })

      describe('tries to send a request without name', () => {
        beforeAll(async () => {
          response = await request(server.app).put('/folders').set('Cookie', cookie).send({ id: 'id doesnt really metter' })
        })

        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })

        it('returns 400', () => {
          expect(response.statusCode).toBe(400)
        })
      })

      describe('tries to send a request without id', () => {
        beforeAll(async () => {
          response = await request(server.app).put('/folders').set('Cookie', cookie).send({ name: 'the name doesnt really metter' })
        })

        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })

        it('returns 400', () => {
          expect(response.statusCode).toBe(400)
        })
      })

      describe('tries to change a folder that you do not own', () => {
        let folderId: string
        beforeAll(async () => {
          const folderIDoNotOwn = await prismaClient.folder.create({
            data: {
              name: 'other cool folder',
              owner: {
                create: {
                  name: 'cool name',
                  email: 'coolemail@mail.com'
                }
              }
            }
          })
          folderId = folderIDoNotOwn.id

          response = await request(server.app).put('/folders').set('Cookie', cookie).send({ id: folderId, name: 'lmao that not going to work' })
        })

        it('returns the right message', () => {
          expect(response.body.message).toBe("You don't have permission over this folder.")
        })
        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })
        it('returns 403', () => {
          expect(response.statusCode).toBe(403)
        })
      })
    })
  })
})
