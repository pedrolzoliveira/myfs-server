import { Multer } from 'multer'

export class UploadHandler {
  constructor (
    private readonly upload: Multer
  ) {}

  handle() {
    return this.upload.single('file')
  }
}
