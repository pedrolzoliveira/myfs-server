import { CreateUserRepository } from '../../data/create-user-repository'
import { CreateUser as ICreateUser, CreateUserData } from '../../domain/use-cases/create-user'

export class CreateUser implements ICreateUser {
  constructor(
    readonly createUserRepository: CreateUserRepository
  ) {}

  async exec(data: CreateUserData) {
    return await this.createUserRepository.createUser(data)
  }
}
