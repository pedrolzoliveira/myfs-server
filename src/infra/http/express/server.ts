import express, { Application, Router, json } from 'express'

export class Server {
  app: Application
  constructor(
    routes: Router
  ) {
    this.app = express()
    this.app.use(json())
    this.app.use(routes)
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.info(`Listening on port ${port}`)
    })
  }
}
