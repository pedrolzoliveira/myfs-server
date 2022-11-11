import { PrismaClient } from '@prisma/client'
import { CreateFileData, CreateFileRepository } from '../../../data/create-file-repository'

export class FilePrismaRepository implements CreateFileRepository {
  constructor (
    private readonly prismaClient: PrismaClient
  ) {}

  async create(data: CreateFileData) {
    return await this.prismaClient.file.create({ data })
  }
}
