import { Request, Response } from 'express'
import { CreateFolder } from '../../../../domain/use-cases/create-folder'
import { GetFolder } from '../../../../domain/use-cases/get-folder'
import { transformResponse } from '../../transformers/response-transformer'
import HttpStatusCode from '../../http-status-code'

export class FolderController {
  constructor (
    private readonly createFolder: CreateFolder,
    private readonly getFolder: GetFolder
  ) {}

  async create(req: Request, res: Response) {
    const folder = await this.createFolder.exec(req.body)
    return res.status(HttpStatusCode.CREATED).send(
      transformResponse({
        payload: { folder }
      })
    )
  }

  async find(req: Request, res: Response) {
    if (req.body.id) {
      const folder = await this.getFolder.exec(req.body)
      return res.status(HttpStatusCode.OK).send({
        payload: { folder }
      })
    }
    const folders = await this.getFolder.exec(req.body)
    return res.status(HttpStatusCode.OK).send({
      payload: { folders }
    })
  }
}
