import { Request, Response, NextFunction } from 'express'
import { checkSchema, Schema } from 'express-validator'
import { HttpStatusCode } from '../../http-status-code'
import { transformResponse } from '../../transformers/response-transformer'

export class SchemaValidator {
  handle(schema: Schema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const [result] = await checkSchema(schema).run(req)
      const errors = result.array()
      if (!errors.length) {
        return next()
      }
      return res.status(HttpStatusCode.BAD_REQUEST).send(
        transformResponse({
          errors
        })
      )
    }
  }
}
