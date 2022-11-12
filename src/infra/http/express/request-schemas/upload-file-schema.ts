import { Schema } from 'express-validator'

export const UploadFile: Schema = {
  folderId: {
    isString: true,
    in: ['query'],
    errorMessage: 'folderId is required'
  }
}
