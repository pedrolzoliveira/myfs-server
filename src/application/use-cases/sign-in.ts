import { FindUserRepository } from '../../data/find-user-repository'
import { SignIn as ISignIn, SignInData } from '../../domain/use-cases/sign-in'

export class SignIn implements ISignIn {
  constructor(
    readonly findUserRepository: FindUserRepository
  ) {}

  async exec(data: SignInData) {
    return this.findUserRepository.find(data)
  }
}
