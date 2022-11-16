export interface Factory<T> {
  create: (param?: any) => T | Promise<T>
}
