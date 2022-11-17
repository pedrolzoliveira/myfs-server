import { Request, Response, NextFunction } from 'express'
import { EmptyResultError } from '../../../../application/errors/empty-result-error'
import { PermissionError } from '../../../../application/errors/permission-error'
import { SameNameError } from '../../../../application/errors/same-name-error'
import { User } from '../../../../domain/model/user'
import { CreateFile } from '../../../../domain/use-cases/create-file'
import { MoveFile } from '../../../../domain/use-cases/move-file'
import { PrepareDeleteFile } from '../../../../domain/use-cases/prepare-delete-file'
import { RenameFile } from '../../../../domain/use-cases/rename-file'
import { UserHasFolderPermission } from '../../../../domain/use-cases/user-has-folder-permission'
import { HttpError } from '../../http-error'
import { HttpStatusCode } from '../../http-status-code'
import { transformResponse } from '../../transformers/response-transformer'

interface CreateFileRequest extends Request {
  query: {
    folderId: string
  }
}

export class FileController {
  constructor(
    private readonly userHasFolderPermission: UserHasFolderPermission,
    private readonly createFile: CreateFile,
    private readonly renameFile: RenameFile,
    private readonly prepareDeleteFile: PrepareDeleteFile,
    private readonly moveFile: MoveFile
  ) {}

  async checkPermission(req: CreateFileRequest, res: Response, next: NextFunction) {
    try {
      const hasPermission = await this.userHasFolderPermission.exec({
        userId: (req.session.user as User).id as string,
        folderId: req.query.folderId
      })
      if (!hasPermission) throw new HttpError(403, "You don't have rigths over this folder.")
      return next()
    } catch (e) {
      if (e instanceof EmptyResultError) {
        throw new HttpError(404, "Folder doesn't exists")
      }
      throw e
    }
  }

  async create(req: CreateFileRequest, res: Response) {
    const file = await this.createFile.exec({
      name: req.file?.originalname as string,
      folderId: req.query.folderId,
      location: req.file?.path as string
    })
    return res.status(HttpStatusCode.CREATED).send(
      transformResponse({
        payload: { file },
        message: 'File created successfully'
      }))
  }

  async update(req: Request, res: Response) {
    try {
      const file = await this.renameFile.exec({
        userId: req.session.user?.id as string,
        name: req.body.name,
        id: req.body.id
      })
      return res.status(HttpStatusCode.OK).send(
        transformResponse({
          payload: { file },
          message: 'Name changed.'
        })
      )
    } catch (e) {
      if (e instanceof PermissionError) {
        throw new HttpError(403, "You don't have permission over this file.")
      }
      if (e instanceof EmptyResultError) {
        throw new HttpError(404, 'File not found.')
      }
      if (e instanceof SameNameError) {
        throw new HttpError(409, "There's already a file with that name in this folder.")
      }
      throw e
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deleted = await this.prepareDeleteFile.exec({
        id: req.body.id,
        userId: req.session.user?.id as string
      })
      if (!deleted) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(
          transformResponse({
            errors: [
              { message: 'Error when excluding file' }
            ],
            message: 'Error when excluding the file',
            ok: false
          })
        )
      }
      return res.status(HttpStatusCode.OK).send(
        transformResponse({
          message: 'File excluded successfully',
          ok: true
        })
      )
    } catch (e) {
      if (e instanceof EmptyResultError) {
        throw new HttpError(404, 'File not found.')
      }
      if (e instanceof PermissionError) {
        throw new HttpError(403, "You don't have permission over this file.")
      }
      throw e
    }
  }

  async move(req: Request, res: Response) {
    try {
      const file = await this.moveFile.exec({
        id: req.body.id,
        folderId: req.body.folderId,
        userId: req.session.user?.id as string
      })
      return res.status(HttpStatusCode.OK).send(
        transformResponse({
          payload: { file },
          message: 'File moved successfully'
        })
      )
    } catch (e) {
      if (e instanceof PermissionError) {
        throw new HttpError(403, "You don't have permission over this file or folder.")
      }
      if (e instanceof EmptyResultError) {
        throw new HttpError(404, 'Folder or file not found.')
      }
      if (e instanceof SameNameError) {
        throw new HttpError(409, "There's already a file with the same name in target folder.")
      }
      throw e
    }
  }
}
