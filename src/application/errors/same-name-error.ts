export class SameNameError extends Error {
  constructor() {
    super('The name is already being used')
  }
}
