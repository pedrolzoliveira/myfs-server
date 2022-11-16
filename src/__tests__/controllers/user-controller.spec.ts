import { createServer } from '../../factories/server-factory'
import { Server } from '../../infra/http/express/server'
import request, { Response } from 'supertest'
import { User } from '../../domain/model/user'

describe('UserController', () => {
  let server: Server
  let response: Response

  beforeAll(async () => {
    server = await createServer()
  })

  describe('POST /users', () => {
    describe('2XX', () => {
      describe('creates a user', () => {
        beforeAll(async () => {
          response = await request(server.app).post('/users').send({ name: 'Pedro', email: 'pedro@mail.com' })
        })

        it('payload returns the user', () => {
          expect(response.body.payload.user.name).toBe('Pedro')
          expect(response.body.payload.user.email).toBe('pedro@mail.com')
        })

        it('returns the rigth message', () => {
          expect(response.body.message).toBe('User created succesfully')
        })

        it('returns ok true', () => {
          expect(response.body.ok).toBe(true)
        })

        it('returns a 201', () => {
          expect(response.statusCode).toBe(201)
        })
      })
    })

    describe('4XX', () => {
      describe('tries to create a user without name', () => {
        beforeAll(async () => {
          response = await request(server.app).post('/users').send({ email: 'totally_right@email.com' })
        })

        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })

        it('returns a 400', () => {
          expect(response.statusCode).toBe(400)
        })
      })

      describe('tries to create a user without email', () => {
        beforeAll(async () => {
          response = await request(server.app).post('/users').send({ name: 'john' })
        })

        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })

        it('returns a 400', () => {
          expect(response.statusCode).toBe(400)
        })
      })

      describe('tries to create a user with invalid email', () => {
        beforeAll(async() => {
          response = await request(server.app).post('/users').send({ name: 'Totally valid name', email: 'not valid email' })
        })

        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })

        it('returns a 400', () => {
          expect(response.statusCode).toBe(400)
        })
      })

      describe('tries to create a user with email already taken', () => {
        beforeAll(async() => {
          await request(server.app).post('/users').send({ name: 'Lmao whatever', email: 'used_email@mail.com' })
          response = await request(server.app).post('/users').send({ name: 'Give me this Email', email: 'used_email@mail.com' })
        })

        it('response with the rigth message', () => {
          expect(response.body.message).toBe('Email used_email@mail.com is already taken.')
        })

        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })

        it('returns a 409', () => {
          expect(response.statusCode).toBe(409)
        })
      })
    })
  })

  describe('POST /users/sign-in', () => {
    let accountCreated: User
    beforeAll(async () => {
      const res = await request(server.app).post('/users').send({ name: 'Peter Brabo', email: 'valid_email@mail.com' })
      accountCreated = res.body.payload.user
    })

    describe('2XX', () => {
      describe('signIn', () => {
        beforeAll(async() => {
          response = await request(server.app).post('/users/sign-in').send({ email: 'valid_email@mail.com' })
        })

        it('returns the right user', () => {
          expect(response.body.payload.user).toStrictEqual(accountCreated)
        })

        it('returns the right message', () => {
          expect(response.body.message).toBe('LoggedIn successfully')
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
      describe('tries to loggin with an inexisting email', () => {
        beforeAll(async () => {
          response = await request(server.app).post('/users/sign-in').send({ email: 'lmao_nobody_used_that@mail.com' })
        })

        it('returns the right message', () => {
          expect(response.body.message).toBe('User not found')
        })

        it('returns ok false', () => {
          expect(response.body.ok).toBe(false)
        })

        it('returns a 404', () => {
          expect(response.statusCode).toBe(404)
        })
      })
    })
  })
})
