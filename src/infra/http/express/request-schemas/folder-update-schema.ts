import { Schema } from 'express-validator'

export const FolderUpdateSchema: Schema = {
  id: {
    isString: true,
    in: ['body'],
    errorMessage: 'id is required'
  },
  name: {
    isString: true,
    in: ['body'],
    errorMessage: 'name is required'
  }
}
