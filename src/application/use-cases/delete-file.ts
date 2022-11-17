import { DeleteFile as IDeleteFile } from '../../domain/use-cases/delete-file'
import { unlink } from 'fs/promises'
export class DeleteFile implements IDeleteFile {
  async exec(location: string) {
    try {
      await unlink(location)
      return true
    } catch (e) {
      return false
    }
  }
}
