import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../../http-status-code'
import { transformResponse } from '../../transformers/response-transformer'

export class ErrorHandler {
  handle(error: Error, req: Request, res: Response, next: NextFunction) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(
      transformResponse({
        errors: [error],
        message: 'Internal Server Error',
        ok: false
      })
    )
  }
}
