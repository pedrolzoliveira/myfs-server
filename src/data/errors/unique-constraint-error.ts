export class UniqueConstraintError extends Error {
  table: string
  column: string
  constructor(table: string, column: string) {
    const message = `Unique constraint vaiolation on table ${table}, ${column} is already being used by another record.`
    super(message)
    this.table = table
    this.column = column
  }
}
