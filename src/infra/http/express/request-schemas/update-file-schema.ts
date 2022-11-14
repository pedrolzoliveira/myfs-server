import { Schema } from 'express-validator'

export const UpdateFileSchema: Schema = {
  name: {
    isString: true,
    in: ['body'],
    errorMessage: 'name is required'
  },
  id: {
    isString: true,
    in: ['body'],
    errorMessage: 'id is required'
  }
}
