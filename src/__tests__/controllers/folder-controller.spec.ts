import { createServer } from '../../factories/server-factory'
import { Server } from '../../infra/http/express/server'
import request, { Response } from 'supertest'
import { Folder } from '../../domain/model/folder'

describe.only('FolderController', () => {
  let server: Server

  beforeAll(() => {
    server = createServer()
  })

  describe('POST /folders', () => {
    let response: Response
    let cookie: string[]

    beforeAll(async () => {
      await request(server.app).post('/users').send({ name: 'my logged user', email: 'logged_user@mail.com' })
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

        it('should return 201', () => {
          expect(response.statusCode).toBe(201)
        })
      })
    })

    describe('4XX', () => {
      describe('tries to create a file without being logged', () => {
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

      describe('tries to create a folder with an empty payload', () => {
        beforeAll(async() => {
          response = await request(server.app).post('/folders').set('Cookie', cookie).send({})
        })

        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })

        it('should return 400', () => {
          expect(response.statusCode).toBe(400)
        })
      })

      describe('tries to create a folder with an invalid parentId', () => {
        beforeAll(async () => {
          response = await request(server.app).post('/folders').set('Cookie', cookie).send({ name: 'valid name', parentId: 'lmao i dont exist' })
        })

        it('returns the right message', () => {
          expect(response.body.message).toBe("Parent folder doesn't exists")
        })

        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })

        it('returns a 404', () => {
          expect(response.statusCode).toBe(404)
        })
      })

      // describe('tries to create a folder without the right permission', () => {
      //   beforeAll(async () => {
      //     await request(server.app).post('/users').send({ name: 'my logged new user', email: 'new_logged_user@mail.com' })
      //     const loginResponse = await request(server.app).post('/users/sign-in').send({ email: 'new_logged_user@mail.com' })
      //     const folderResponse = await request(server.app).post('folders').set('Cookie', loginResponse.headers['set-cookie']).send({ name: 'new cool folder' })
      //     const parentId = folderResponse.body.payload.folder.id

      //     response = await request(server.app).post('/folders').set('Cookie', cookie).send({ name: 'forbiden children', parentId })
      //   })

      //   it('returns the right message', () => {
      //     expect(response.body.message).toBe("You don't have permission on this folder")
      //   })

      //   it('returns ok false', () => {
      //     expect(response.body.ok).toBe(false)
      //   })

      //   it('returns 403', () => {
      //     expect(response.statusCode).toBe(403)
      //   })
      // })
    })
  })
})
