import { PrismaClient } from '@prisma/client'
import { CountFileRepository, CountData } from '../../../data/count-file-repository'
import { CreateFileData, CreateFileRepository } from '../../../data/create-file-repository'
import { FindData, FindFileRepository } from '../../../data/find-file-repository'
import { UpdateFileData, UpdateFileRepository } from '../../../data/update-file-repository'

export class FilePrismaRepository implements CreateFileRepository, FindFileRepository, CountFileRepository, UpdateFileRepository {
  constructor (
    private readonly prismaClient: PrismaClient
  ) {}

  async create(data: CreateFileData) {
    return await this.prismaClient.file.create({
      data: {
        name: data.name,
        location: data.location,
        folder: {
          connect: {
            id: data.folderId
          }
        }
      }
    })
  }

  async find(data: FindData) {
    return this.prismaClient.file.findFirst({
      where: { ...data }
    })
  }

  async count(data: CountData) {
    return this.prismaClient.file.count({ where: { ...data } })
  }

  update(data: UpdateFileData) {
    return this.prismaClient.file.update({
      where: {
        id: data.id
      },
      data: {
        name: data.name,
        folderId: data.folderId
      }
    })
  }
}
