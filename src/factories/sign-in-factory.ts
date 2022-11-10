import { SignIn } from '../application/use-cases/sign-in'
import { FindUserRepository } from '../data/find-user-repository'

export function createSignIn(findUserRepository: FindUserRepository) {
  return new SignIn(findUserRepository)
}
