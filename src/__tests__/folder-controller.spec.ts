import { createServer } from '../factories/server-factory'
import { Server } from '../infra/http/express/server'
import request, { Response } from 'supertest'

describe('FolderController', () => {
  let server: Server
  beforeAll(() => {
    server = createServer()
  })

  describe('POST /folders', () => {
    let response: Response
    describe('Bad request errors', () => {
      beforeAll(async() => {
        response = await request(server.app).post('/folders').send({})
      })
      it('should return 400', () => {
        expect(response.statusCode).toBe(400)
      })
    })
    describe('success', () => {
      beforeAll(async () => {
        response = await request(server.app).post('/folders').send({ name: 'My folder' })
      })
      it('should return 201', () => {
        expect(response.statusCode).toBe(201)
      })
      it('should return "My folder" as the name in the payload', () => {
        expect(response.body.payload.folder.name).toBe('My folder')
      })
    })
  })
})
