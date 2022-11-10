import { Request, Response } from 'express'
import { UniqueConstraintError } from '../../../../data/errors/unique-constraint-error'
import { CreateUser } from '../../../../domain/use-cases/create-user'
import { HttpError } from '../../http-error'
import { HttpStatusCode } from '../../http-status-code'
import { transformResponse } from '../../transformers/response-transformer'

interface CreateRequest extends Request {
  body: {
    name: string
    email: string
  }
}

export class UserController {
  constructor(
    private readonly createUser: CreateUser
  ) {}

  async create(req: CreateRequest, res: Response) {
    try {
      const user = await this.createUser.exec(req.body)
      return res.status(HttpStatusCode.CREATED).send(
        transformResponse({
          payload: { user },
          message: 'User created succesfully'
        })
      )
    } catch (e) {
      if (e instanceof UniqueConstraintError && e.column === 'email') {
        throw new HttpError(409, `Email ${req.body.email} is already taken.`)
      }
      throw e
    }
  }
}
