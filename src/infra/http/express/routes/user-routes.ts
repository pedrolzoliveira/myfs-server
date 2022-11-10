import { Router } from 'express'
import { UserController } from '../controllers/user-controller'
import { SchemaValidator } from '../middlawares/schema-validator'
import { UserCreateSchema } from '../request-schemas/user-create-schema'

export class UserRoutes {
  public route: Router
  constructor(
    private readonly schemaValidator: SchemaValidator,
    public userController: UserController
  ) {
    this.route = Router()
    this.route.post('/', this.schemaValidator.handle(UserCreateSchema), this.userController.create.bind(userController))
    this.route.post('/sign-in', this.schemaValidator.handle({ email: { isString: true } }), this.userController.signIn.bind(userController))
  }
}
