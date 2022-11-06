import { Schema } from 'express-validator'

export const FolderCreateSchema: Schema = {
  name: {
    isString: true,
    in: ['body'],
    errorMessage: 'name is required'
  }
}
