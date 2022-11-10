export class PermissionError extends Error {
  constructor() {
    super("You don't have permission to make this action.")
  }
}
