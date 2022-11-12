import { UploadHandler } from '../infra/http/express/middlawares/upload-handler'
import multer from 'multer'

export function createUploadHandler() {
  const upload = multer({ dest: process.env.MULTER_DEST })
  return new UploadHandler(upload)
}
