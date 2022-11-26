import { Request, Response } from 'express'
import { UniqueConstraintError } from '../../../../data/errors/unique-constraint-error'
import { CreateUser } from '../../../../domain/use-cases/create-user'
import { SignIn } from '../../../../domain/use-cases/sign-in'
import { HttpError } from '../../http-error'
import { HttpStatusCode } from '../../http-status-code'
import { transformResponse } from '../../transformers/response-transformer'

export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly signInUseCase: SignIn
  ) {}

  async create(req: Request, res: Response) {
    try {
      const user = await this.createUser.exec({
        email: req.data.email,
        name: req.data.name
      })
      return res.status(HttpStatusCode.CREATED).send(
        transformResponse({
          payload: { user },
          message: 'User created succesfully'
        })
      )
    } catch (e) {
      if (e instanceof UniqueConstraintError && e.column === 'email') {
        throw new HttpError(409, `Email ${req.data.email as string} is already taken.`)
      }
      throw e
    }
  }

  async signIn(req: Request, res: Response) {
    const user = await this.signInUseCase.exec({
      email: req.data.email
    })
    if (!user) throw new HttpError(404, 'User not found')
    req.session.user = user
    return res.status(HttpStatusCode.OK).send(
      transformResponse({
        payload: { user },
        message: 'LoggedIn successfully'
      })
    )
  }

  info(req: Request, res: Response) {
    const user = req.session.user
    if (!user) {
      throw new HttpError(401, "You're not logged in")
    }
    return res.status(200).send(
      transformResponse({
        payload: { user }
      })
    )
  }

  logout(req: Request, res: Response) {
    req.session.destroy(() => {
      res.status(200).send(
        transformResponse({
          ok: true
        })
      )
    })
  }
}
