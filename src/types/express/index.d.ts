declare global {
  namespace Express {
    export interface Request {
      filters: string[];
    }
  }
}
