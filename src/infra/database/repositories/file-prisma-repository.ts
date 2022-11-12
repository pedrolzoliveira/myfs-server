import { PrismaClient } from '@prisma/client'
import { CreateFileData, CreateFileRepository } from '../../../data/create-file-repository'

export class FilePrismaRepository implements CreateFileRepository {
  constructor (
    private readonly prismaClient: PrismaClient
  ) {}

  async create(data: CreateFileData) {
    console.log({ data })
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
}
