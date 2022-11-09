import { HttpStatusCode } from './http-status-code'

export class HttpError extends Error {
  statusCode: number
  message: string
  constructor(statusCode: HttpStatusCode, message_?: string) {
    const message = message_ ?? Object.keys(HttpStatusCode)[Object.values(HttpStatusCode).indexOf(statusCode)]
    super(message)
    this.statusCode = statusCode
    this.message = message
  }
}
