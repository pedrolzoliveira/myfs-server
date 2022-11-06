import { Request, Response, NextFunction } from 'express'
import { checkSchema, Schema } from 'express-validator'
import { HttpStatusCode } from '../../http-status-code'
import { transformResponse } from '../../transformers/response-transformer'

export class SchemaValidator {
  handle(schema: Schema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const errors = await checkSchema(schema).run(req)
      if (!errors.length) {
        next()
      }
      res.status(HttpStatusCode.BAD_REQUEST).send(
        transformResponse({
          errors
        })
      )
    }
  }
}
