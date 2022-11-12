import { createServer } from '../../factories/server-factory'
import { Server } from '../../infra/http/express/server'
import request, { Response } from 'supertest'
import { PrismaClient } from '@prisma/client'
import { createPrismaClient } from '../../factories/prisma-client-factory'

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
    describe('4XX', () => {
      describe('tries to upload a file without being logged in', () => {
        beforeAll(async() => {
          response = await request(server.app).post(`/files/upload?folderId=${folderId}`).send()
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

          response = await request(server.app).post(`/files/upload?folderId=${folder.id}`).set('Cookie', cookie).send()
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
    })
  })
})
