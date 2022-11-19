import { Schema } from 'express-validator'

export const MoveFolderSchema: Schema = {
  id: {
    isString: true,
    in: ['body'],
    errorMessage: 'id is required'
  },
  parentId: {
    isString: true,
    in: ['body'],
    optional: true,
    errorMessage: 'folderId is required'
  }
}
