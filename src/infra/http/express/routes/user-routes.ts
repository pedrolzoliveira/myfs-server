import { Router } from 'express'
import { UserController } from '../controllers/user-controller'
import { SchemaValidator } from '../middlawares/schema-validator'
import { Authenticator } from '../middlawares/authenticator'
import { UserCreateSchema } from '../request-schemas/user-create-schema'

export class UserRoutes {
  public route: Router
  constructor(
    private readonly schemaValidator: SchemaValidator,
    private readonly authenticator: Authenticator,
    public userController: UserController
  ) {
    this.route = Router()
    this.route.post('/', this.schemaValidator.handle(UserCreateSchema), this.userController.create.bind(userController))
    this.route.post('/sign-in', this.schemaValidator.handle({ email: { isString: true } }), this.userController.signIn.bind(userController))
    this.route.post('/logout', this.authenticator.handle, this.userController.logout.bind(userController))
    this.route.get('/info', this.authenticator.handle, this.userController.info.bind(userController))
  }
}
