import { RenameFolder as IRenameFolder, RenameFolderData } from '../../domain/use-cases/rename-folder'
import { UpdateFolderRepository } from '../../data/update-folder-repository'
import { IsNameAvailble } from '../../domain/use-cases/is-name-availble'
import { FindFolderRepository } from '../../data/find-folder-repository'
import { EmptyResultError } from '../errors/empty-result-error'
import { SameNameError } from '../errors/same-name-error'

export class RenameFolder implements IRenameFolder {
  constructor (
    private readonly folderRepository: UpdateFolderRepository & FindFolderRepository,
    private readonly isNameAvailble: IsNameAvailble
  ) {}

  async exec(data: RenameFolderData) {
    const folder = await this.folderRepository.find({ id: data.id })
    if (!folder) throw new EmptyResultError()
    if (folder.parentId) {
      const isNameAvailble = await this.isNameAvailble.exec({
        name: data.name,
        parentFolderId: folder.parentId
      })
      if (!isNameAvailble) throw new SameNameError()
    }
    return await this.folderRepository.updateFolder({
      ...data
    })
  }
}
