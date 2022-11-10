import { User } from '../../domain/model/user'
import { CreateUser } from '../../domain/use-cases/create-user'
import { createCreateUser } from '../../factories/use-cases/create-user-factory'
import { createPrismaClient } from '../../factories/prisma-client-factory'
import { createUserPrismaRepository } from '../../factories/user-prisma-repository'

describe('Create User Use Case', () => {
  let createUser: CreateUser

  beforeAll(() => {
    createUser = createCreateUser(createUserPrismaRepository(createPrismaClient()))
  })

  describe('creates a user', () => {
    let user: User

    beforeAll(async () => {
      user = await createUser.exec({ name: 'Pedro', email: 'pedro@email.com' })
    })

    it('has a email', () => {
      expect(user.email).toBe('pedro@email.com')
    })

    it('has a name', () => {
      expect(user.name).toBe('Pedro')
    })

    it('is not admin', () => {
      expect(user.admin).toBe(false)
    })
  })

  describe('tries to create an user with already used email', () => {
    let firstUser: User

    beforeAll(async () => {
      firstUser = await createUser.exec({ name: 'Tony Stark', email: 'tony_stark@email.com' })
    })

    it('should throw', () => {
      expect(async () => {
        await createUser.exec({ name: 'Peter Parker', email: firstUser.email })
      }).rejects.toThrow()
    })
  })
})
