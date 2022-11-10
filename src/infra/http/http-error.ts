import { HttpStatusCode } from './http-status-code'

export class HttpError extends Error {
  statusCode: number
  message: string
  constructor(statusCode: HttpStatusCode, message_?: string) {
    const statusName = Object.keys(HttpStatusCode)[Object.values(HttpStatusCode).indexOf(statusCode)]
    const message = message_ ?? statusName
    super(message)
    this.statusCode = statusCode
    this.message = message
    this.name = statusName
  }
}
