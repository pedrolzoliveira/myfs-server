import { SchemaValidator } from '../infra/http/express/middlawares/schema-validator'

export function createSchemaValidator() {
  return new SchemaValidator()
}
