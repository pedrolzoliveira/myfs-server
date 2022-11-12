import { CreateFileRepository } from '../../data/create-file-repository'
import { CreateFile as ICreateFile, CreateFileData } from '../../domain/use-cases/create-file'

export class CreateFile implements ICreateFile {
  constructor(
    private readonly fileRepository: CreateFileRepository
  ) {}

  async exec(data: CreateFileData) {
    return this.fileRepository.create(data)
  }
}
