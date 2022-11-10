// import { serializeError } from 'serialize-error'
import { Response } from '../interfaces/response'

interface transformResponseParams {
  payload?: any
  errors?: any[]
  message?: string
  ok?: boolean
}

export const transformResponse = (res: transformResponseParams = {}): Response => ({
  ...res,
  errors: res.errors?.map(error => error),
  ok: res.ok ?? !res.errors?.length
})
