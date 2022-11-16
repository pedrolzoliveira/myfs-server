import { SignIn } from '../../../application/use-cases/sign-in'
import { Factory } from '../../factory'
import { UserPrismaRepositoryFactory } from '../../infra/repositories/user-prisma-repository'

export const SignInFactory: Factory<SignIn> = {
  async create() {
    return new SignIn(
      await UserPrismaRepositoryFactory.create()
    )
  }
}
