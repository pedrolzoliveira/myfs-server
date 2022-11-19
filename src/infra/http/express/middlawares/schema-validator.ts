import { Request, Response, NextFunction } from 'express'
import { checkSchema, matchedData, Schema } from 'express-validator'
import { HttpStatusCode } from '../../http-status-code'
import { transformResponse } from '../../transformers/response-transformer'

export class SchemaValidator {
  handle(schema: Schema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const resultArr = await checkSchema(schema).run(req)
      const errors = resultArr.map(result => result.array()).flat()
      if (!errors.length) {
        req.data = matchedData(req)
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
