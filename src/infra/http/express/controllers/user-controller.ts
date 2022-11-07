import { Request, Response } from 'express'
import { CreateUser } from '../../../../domain/use-cases/create-user'
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
    const user = await this.createUser.exec(req.body)
    return res.status(HttpStatusCode.CREATED).send(
      transformResponse({
        payload: { user },
        message: 'User created succesfully'
      })
    )
  }
}
