import multer from 'multer'
import { UploadHandler } from '../../infra/http/express/middlawares/upload-handler'
import { Factory } from '../factory'

export const UploadHandlerFactory: Factory<UploadHandler> = {
  async create() {
    const upload = multer({ dest: process.env.MULTER_DEST })
    return new UploadHandler(upload)
  }
}
