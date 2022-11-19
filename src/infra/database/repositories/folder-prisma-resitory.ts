import { PrismaClient } from '@prisma/client'
import { EmptyResultError } from '../../../application/errors/empty-result-error'
import { CreateFolderData, CreateFolderRepository } from '../../../data/create-folder-repository'
import { DeleteFolderRepository, DeleteFolderData } from '../../../data/delete-folder-repository'
import { FindAllData, FindAllFolderRepository } from '../../../data/find-all-folder-repository'
import { FindFolderData, FindFolderRepository } from '../../../data/find-folder-repository'
import { FindFolderTreeRepository, FolderTree } from '../../../data/find-folder-tree-repository'
import { UpdateFolderData, UpdateFolderRepository } from '../../../data/update-folder-repository'

export class FolderPrismaRepository implements FindFolderRepository, FindAllFolderRepository, UpdateFolderRepository, CreateFolderRepository, DeleteFolderRepository, FindFolderTreeRepository {
  constructor(
    private readonly prismaClient: PrismaClient
  ) {}

  async createFolder(data: CreateFolderData) {
    return await this.prismaClient.folder.create({ data })
  }

  find(data: FindFolderData) {
    return this.prismaClient.folder.findFirst({
      where: {
        ...data
      },
      include: {
        files: true,
        folders: true
      }
    })
  }

  findAll(data: FindAllData) {
    return this.prismaClient.folder.findMany({
      where: {
        ...data
      },
      include: {
        files: true,
        folders: true
      }
    })
  }

  async updateFolder(data: UpdateFolderData) {
    const folder = await this.prismaClient.folder.update({
      where: {
        id: data.id
      },
      data: {
        ...data
      }
    })
    return folder
  }

  async deleteFolder(data: DeleteFolderData) {
    try {
      await this.prismaClient.$transaction(
        async (prisma) => {
          await prisma.folder.delete({
            where: { id: data.id }
          })
          await data.callback?.()
        }
      )
      return true
    } catch (_) {
      return false
    }
  }

  async getTree(id: string) {
    const helper = async (id: string): Promise<FolderTree> => {
      const folder = await this.prismaClient.folder.findUnique({
        where: {
          id
        },
        include: {
          files: true,
          folders: true
        }
      })
      if (!folder) throw new EmptyResultError()
      return {
        ...folder,
        folders: await Promise.all(folder.folders.map(async f => await helper(f.id)))
      }
    }
    return helper(id)
  }
}
