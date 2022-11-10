import { User } from '../../../domain/model/user'

declare module 'express-session' {
  export interface SessionData {
    user: User
  }
}
