import { CountFileRepository } from '../../data/count-file-repository'
import { CreateFileRepository } from '../../data/create-file-repository'
import { FindFileRepository } from '../../data/find-file-repository'
import { CreateFile as ICreateFile, CreateFileData } from '../../domain/use-cases/create-file'

export class CreateFile implements ICreateFile {
  constructor(
    private readonly fileRepository: CreateFileRepository & FindFileRepository & CountFileRepository
  ) {}

  async exec(data: CreateFileData) {
    const sameNameFile = await this.fileRepository.find({ name: data.name, folderId: data.folderId })
    if (sameNameFile) {
      const count = await this.fileRepository.count({ name: data.name, folderId: data.folderId })
      return this.fileRepository.create({
        name: `${data.name} (${count})`,
        folderId: data.folderId,
        location: data.location
      })
    }
    return this.fileRepository.create(data)
  }
}
