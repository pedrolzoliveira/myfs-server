import { PrismaClient } from '@prisma/client'
import { CreateFolderData, CreateFolderRepository } from '../../../data/create-folder-repository'
import { DeleteFolderRepository, DeleteFolderData } from '../../../data/delete-folder-repository'
import { FindAllData, FindAllFolderRepository } from '../../../data/find-all-folder-repository'
import { FindFolderData, FindFolderRepository } from '../../../data/find-folder-repository'
import { UpdateFolderData, UpdateFolderRepository } from '../../../data/update-folder-repository'

export class FolderPrismaRepository implements FindFolderRepository, FindAllFolderRepository, UpdateFolderRepository, CreateFolderRepository, DeleteFolderRepository {
  constructor(
    private readonly prismaClient: PrismaClient
  ) {}

  async createFolder(data: CreateFolderData) {
    return await this.prismaClient.folder.create({ data })
  }

  find(data: FindFolderData) {
    return this.prismaClient.folder.findUnique({ where: { id: data.id } })
  }

  findAll(data: FindAllData) {
    return this.prismaClient.folder.findMany({ where: { id: data.id } })
  }

  async updateFolder(data: UpdateFolderData) {
    const folder = await this.prismaClient.folder.findUnique({ where: { id: data.id } })
    if (!folder) throw new Error(`Folder with id ${data.id} not found`)
    folder.name = data.name
    return folder
  }

  async deleteFolder(data: DeleteFolderData) {
    try {
      await this.prismaClient.folder.delete({ where: { id: data.id } })
      return true
    } catch (_) {
      return false
    }
  }
}
