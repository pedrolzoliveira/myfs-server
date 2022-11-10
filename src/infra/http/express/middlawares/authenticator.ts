import { Request, Response, NextFunction } from 'express'
import { HttpError } from '../../http-error'

export class Authenticator {
  handle(req: Request, res: Response, next: NextFunction) {
    if (!req.session.user) throw new HttpError(401)
    return next()
  }
}
