import { SchemaValidator } from '../../infra/http/express/middlawares/schema-validator'
import { Factory } from '../factory'

export const SchemaValidatorFactory: Factory<SchemaValidator> = {
  async create() {
    return new SchemaValidator()
  }
}
