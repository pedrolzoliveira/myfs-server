import { createDeleteFolder } from '../../factories/delete-folder-factory'
import { createFolderPrismaRepository } from '../../factories/folder-prisma-repository-factory'
import { createPrismaClient } from '../../factories/prisma-client-factory'
import { DeleteFolder } from '../../domain/use-cases/delete-folder'

describe('Create Folder Use Case', () => {
  let deleteFolder: DeleteFolder

  beforeAll(() => {
    deleteFolder = createDeleteFolder(createFolderPrismaRepository(createPrismaClient()))
  })

  describe('tries to delete an inexisting folder', () => {
    let deleted: boolean
    beforeAll(async() => {
      deleted = await deleteFolder.exec({ id: 'lmao' })
    })

    it('should return false', () => {
      expect(deleted).toBe(false)
    })
  })
})
