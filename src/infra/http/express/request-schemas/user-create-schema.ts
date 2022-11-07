import { Schema } from 'express-validator'

export const UserCreateSchema: Schema = {
  name: {
    isString: true,
    in: ['body'],
    errorMessage: 'name is required'
  },
  email: {
    isString: true,
    isEmail: true,
    in: ['body'],
    errorMessage: 'email is required'
  }
}
