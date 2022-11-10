export class ForeignKeyConstraintError extends Error {
  table: string
  foreighKey: string
  targetTable: string
  constructor(table: string, foreighKey: string, targetTable: string) {
    const message = `Foreign key constriant violation on table ${table}, key ${foreighKey} doesn't have a record in ${targetTable}.`
    super(message)
    this.table = table
    this.foreighKey = foreighKey
    this.targetTable = targetTable
  }
}
