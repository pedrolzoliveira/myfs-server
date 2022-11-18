import { Schema } from 'express-validator'

export const MoveFileSchema: Schema = {
  id: {
    isString: true,
    in: ['body'],
    errorMessage: 'id is required'
  },
  folderId: {
    isString: true,
    in: ['body'],
    errorMessage: 'folderId is required'
  }
}
