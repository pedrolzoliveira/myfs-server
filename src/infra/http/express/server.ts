import 'express-async-errors'
import express, { Application, Router, json } from 'express'
import { ErrorHandler } from './middlawares/error-handler'
import session from 'express-session'
export class Server {
  app: Application
  constructor(
    routes: Router,
    private readonly errorHandler: ErrorHandler
  ) {
    this.app = express()
    this.app.use(json())
    this.app.use(session({ secret: 'lmao i love pizza', saveUninitialized: false }))
    this.app.use(routes)
    this.app.use(this.errorHandler.handle)
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.info(`Listening on port ${port}`)
    })
  }
}
