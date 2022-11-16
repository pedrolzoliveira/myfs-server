import { Authenticator } from '../../infra/http/express/middlawares/authenticator'
import { Factory } from '../factory'

export const AuthenticatorFactory: Factory<Authenticator> = {
  async create() {
    return new Authenticator()
  }
}
