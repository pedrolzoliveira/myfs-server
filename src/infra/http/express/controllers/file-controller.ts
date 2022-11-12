import { Request, Response, NextFunction } from 'express'
import { EmptyResultError } from '../../../../application/errors/empty-result-error'
import { User } from '../../../../domain/model/user'
import { CreateFile } from '../../../../domain/use-cases/create-file'
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
    private readonly createFile: CreateFile
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
      name: req.file?.filename as string,
      folderId: req.query.folderId,
      path: req.file?.path as string
    })
    return res.status(HttpStatusCode.CREATED).send(
      transformResponse({
        payload: { file },
        message: 'File created successfully'
      }))
  }
}
