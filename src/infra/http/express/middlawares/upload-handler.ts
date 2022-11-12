import { Request, Response, NextFunction } from 'express'
import { Multer } from 'multer'
import { HttpError } from '../../http-error'

export class UploadHandler {
  constructor (
    private readonly upload: Multer
  ) {}

  handle() {
    return this.upload.single('file')
  }

  validateRequest(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      throw new HttpError(400, 'File not sent')
    }
    return next()
  }
}
