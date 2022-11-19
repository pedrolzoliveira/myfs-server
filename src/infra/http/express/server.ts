import 'express-async-errors'
import express, { Application, Router, json, RequestHandler } from 'express'
import { ErrorHandler } from './middlawares/error-handler'

export class Server {
  app: Application
  constructor(
    routes: Router,
    private readonly errorHandler: ErrorHandler,
    private readonly session: RequestHandler
  ) {
    this.app = express()
    this.app.use(json())
    this.app.use(session)
    this.app.use(routes)
    this.app.use(this.errorHandler.handle)
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.info(`Listening on port ${port}`)
    })
  }
}
