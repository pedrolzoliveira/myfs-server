import { Authenticator } from '../infra/http/express/middlawares/authenticator'

export function createAuthenticator() {
  return new Authenticator()
}
