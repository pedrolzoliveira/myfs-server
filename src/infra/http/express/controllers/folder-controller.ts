import { Request, Response } from 'express'
import { CreateFolder } from '../../../../domain/use-cases/create-folder'
import { GetFolder } from '../../../../domain/use-cases/get-folder'
import { transformResponse } from '../../transformers/response-transformer'
import { HttpStatusCode } from '../../http-status-code'
import { PermissionError } from '../../../../application/errors/permission-error'
import { HttpError } from '../../http-error'
import { ForeignKeyConstraintError } from '../../../../data/errors/foreign-key-constraint-error'
import { SameNameError } from '../../../../application/errors/same-name-error'

export class FolderController {
  constructor (
    private readonly createFolder: CreateFolder,
    private readonly getFolder: GetFolder
  ) {}

  async create(req: Request, res: Response) {
    try {
      const data = {
        name: req.body.name,
        userId: req.session.user?.id as string,
        parentId: req.body.parentId
      }
      const folder = await this.createFolder.exec(data)
      return res.status(HttpStatusCode.CREATED).send(
        transformResponse({
          payload: { folder },
          message: 'Folder created successfully'
        })
      )
    } catch (e) {
      if (e instanceof ForeignKeyConstraintError) {
        if (e.targetTable === 'Folder') throw new HttpError(404, "Parent folder doesn't exists.")
      }
      if (e instanceof PermissionError) {
        throw new HttpError(403, "You don't have permission over this folder.")
      }
      if (e instanceof SameNameError) {
        throw new HttpError(409, "There's already a folder with this name inside the parent folder.")
      }
      throw e
    }
  }

  async find(req: Request, res: Response) {
    if (req.body.id) {
      const folder = await this.getFolder.exec(req.body)
      return res.status(HttpStatusCode.OK).send(
        transformResponse({
          payload: { folder }
        })
      )
    }
    const folders = await this.getFolder.exec(req.body)
    return res.status(HttpStatusCode.OK).send(
      transformResponse({
        payload: { folders }
      })
    )
  }
}
