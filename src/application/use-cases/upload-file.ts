import { CreateFileRepository } from '../../data/create-file-repository'
import { UploadFile as IUploadFile, UploadFileData } from '../../domain/use-cases/upload-file'

/**
 * The actually action is going to be made by an middlaware
 */
export class UploadFile implements IUploadFile {
  constructor(
    private readonly fileRepository: CreateFileRepository
  ) {}

  async exec(data: UploadFileData) {
    return this.fileRepository.create(data)
  }
}
