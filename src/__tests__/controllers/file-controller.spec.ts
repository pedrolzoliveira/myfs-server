import { createServer } from '../../factories/server-factory'
import { Server } from '../../infra/http/express/server'
import request, { Response } from 'supertest'
import { PrismaClient } from '@prisma/client'
import { createPrismaClient } from '../../factories/prisma-client-factory'
import { createReadStream } from 'fs'

describe('FileController', () => {
  let server: Server
  let prismaClient: PrismaClient
  let folderId: string
  let response: Response
  let cookie: string[]

  beforeAll(async () => {
    server = createServer()
    prismaClient = createPrismaClient()

    const user = await prismaClient.user.create({ data: { name: 'owner', email: 'owner_folder@mail.com' } })
    const folder = await prismaClient.folder.create({ data: { name: 'testing', userId: user.id } })

    folderId = folder.id

    const r = await request(server.app).post('/users/sign-in').send({ email: 'owner_folder@mail.com' })
    cookie = r.headers['set-cookie']
  })

  describe('POST /files/upload', () => {
    describe('2XX', () => {
      describe('uploads the file to the server', () => {
        beforeAll(async () => {
          response = await request(server.app)
            .post(`/files/upload?folderId=${folderId}`)
            .set('Cookie', cookie)
            .attach('file', createReadStream(__filename))
        })

        it('returns the right name', () => {
          expect(response.body.payload.file.name).toBe('file-controller.spec.ts')
        })

        it('returns the right message', () => {
          expect(response.body.message).toBe('File created successfully')
        })

        it('returns ok true', () => {
          expect(response.body.ok).toBe(true)
        })

        it('returns 201', () => {
          expect(response.statusCode).toBe(201)
        })
      })

      describe('uploads the same file twice', () => {
        beforeAll(async () => {
          response = await request(server.app)
            .post(`/files/upload?folderId=${folderId}`)
            .set('Cookie', cookie)
            .attach('file', createReadStream(__filename))
        })

        it('returns the right name', () => {
          expect(response.body.payload.file.name).toBe('file-controller.spec.ts (1)')
        })

        it('returns the right message', () => {
          expect(response.body.message).toBe('File created successfully')
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
      describe('tries to upload a file without being logged in', () => {
        beforeAll(async() => {
          response = await request(server.app)
            .post(`/files/upload?folderId=${folderId}`)
            .attach('file', createReadStream(__filename))
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

      describe('tries to upload a file in a folder that you do not own', () => {
        beforeAll(async () => {
          const user = await prismaClient.user.create({ data: { name: 'owner2', email: 'owner2_folder@mail.com' } })
          const folder = await prismaClient.folder.create({ data: { name: 'testing2', userId: user.id } })

          response = await request(server.app)
            .post(`/files/upload?folderId=${folder.id}`)
            .set('Cookie', cookie)
            .attach('file', createReadStream(__filename))
        })

        it('returns the right message', () => {
          expect(response.body.message).toBe("You don't have rigths over this folder.")
        })
        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })
        it('returns 403', () => {
          expect(response.statusCode).toBe(403)
        })
      })

      describe('tries to send a request without a file', () => {
        beforeAll(async() => {
          response = await request(server.app)
            .post(`/files/upload?folderId=${folderId}`)
            .set('Cookie', cookie)
            .send()
        })

        it('returns the right message', () => {
          expect(response.body.message).toBe('File not sent')
        })

        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })

        it('returns 400', () => {
          expect(response.statusCode).toBe(400)
        })
      })
    })
  })

  describe('PUT /files', () => {
    describe('2XX', () => {
      describe('changes the name of a file', () => {
        beforeAll(async() => {
          const file = await prismaClient.file.create({
            data: {
              name: 'oldname',
              location: 'location',
              folderId
            }
          })
          response = await request(server.app).put('/files').set('Cookie', cookie).send({ id: file.id, name: 'new name' })
        })

        it('returns the right payload', () => {
          expect(response.body.payload.file.name).toBe('new name')
        })

        it('returns the right message', () => {
          expect(response.body.message).toBe('Name changed.')
        })

        it('returns ok true', () => {
          expect(response.body.ok).toBe(true)
        })

        it('returns 200', () => {
          expect(response.statusCode).toBe(200)
        })
      })
    })
    describe('4XX', () => {
      describe('tries to send a request with an empty payload', () => {
        beforeAll(async() => {
          response = await request(server.app).put('/files').set('Cookie', cookie).send({})
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
          response = await request(server.app).put('/files').set('Cookie', cookie).send({ id: 'id doesnt really metter' })
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
          response = await request(server.app).put('/files').set('Cookie', cookie).send({ name: 'the name doesnt really metter' })
        })

        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })

        it('returns 400', () => {
          expect(response.statusCode).toBe(400)
        })
      })

      describe('tries to send a request without being loggedIn', () => {
        beforeAll(async () => {
          response = await request(server.app).put('/files').send({ id: 'whatever', name: 'doesnot metter' })
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

      describe('tries to change a file that you do not own', () => {
        beforeAll(async () => {
          const fileIDoNotOwn = await prismaClient.file.create({
            data: {
              name: 'some file',
              location: 'some_location',
              folder: {
                create: {
                  name: 'not my cool folder',
                  owner: {
                    create: {
                      name: 'someone else',
                      email: 'some_email@mail.com'
                    }
                  }
                }
              }
            }
          })

          response = await request(server.app).put('/files').set('Cookie', cookie).send({ id: fileIDoNotOwn.id, name: 'should not change' })
        })

        it('returns the right message', () => {
          expect(response.body.message).toBe("You don't have permission over this file.")
        })
        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })
        it('returns 403', () => {
          expect(response.statusCode).toBe(403)
        })
      })

      describe('tries to change a file name with an already used name', () => {
        beforeAll(async() => {
          const [file] = await Promise.all([
            prismaClient.file.create({
              data: {
                name: 'im going to try to change this name',
                location: 'lmao a location',
                folderId
              }
            }),
            prismaClient.file.create({
              data: {
                name: 'name already used',
                location: 'the_location',
                folderId
              }
            })
          ])
          response = await request(server.app).put('/files').set('Cookie', cookie).send({ id: file.id, name: 'name already used' })
        })

        it('returns the right message', () => {
          expect(response.body.message).toBe("There's already a file with that name in this folder.")
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
})
