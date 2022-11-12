import { UploadHandler } from '../infra/http/express/middlawares/upload-handler'
import multer from 'multer'

export function createUploadHandler() {
  const upload = multer()
  return new UploadHandler(upload)
}
