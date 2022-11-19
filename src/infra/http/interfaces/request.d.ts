declare module Express {
  export interface Request {
    data: Record<string, any>
  }
}
