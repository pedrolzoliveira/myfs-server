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
})
