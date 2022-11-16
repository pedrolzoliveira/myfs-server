import { DeleteFile } from '../../../application/use-cases/delete-file'
import { Factory } from '../../factory'

export const DeleteFileFactory: Factory<DeleteFile> = {
  create() {
    return new DeleteFile()
  }
}
