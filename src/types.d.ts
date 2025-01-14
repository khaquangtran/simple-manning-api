import type { JwtPayload } from 'jsonwebtoken'

export type TokenPayload = {
  customerId: number
}

declare global {
  namespace Express {
    interface Request {
      user: TokenPayload & JwtPayload
    }
  }
}
