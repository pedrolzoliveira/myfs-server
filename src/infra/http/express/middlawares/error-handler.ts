import { NextFunction, Request, Response } from 'express'
import { HttpError } from '../../http-error'
import { HttpStatusCode } from '../../http-status-code'
import { transformResponse } from '../../transformers/response-transformer'
export class ErrorHandler {
  handle(error: Error, req: Request, res: Response, next: NextFunction) {
    if (process.env.NODE_ENV === 'development') console.error(error)
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send(
        transformResponse({
          errors: [error],
          message: error.message,
          ok: false
        })
      )
    }
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(
      transformResponse({
        errors: [error],
        message: 'Internal Server Error',
        ok: false
      })
    )
  }
}
