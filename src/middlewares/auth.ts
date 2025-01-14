import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import type { TokenPayload } from '../types'

const jwtSecret = process.env.JWT_SECRET_KEY ?? ''

export const generateToken = (payload: TokenPayload) => {
  return 'Bearer ' + jwt.sign(payload, jwtSecret, { expiresIn: '1h' })
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' })
    return
  }

  try {
    const sourceToken = token.split('Bearer ')[1]
    req.user = jwt.verify(sourceToken, jwtSecret) as TokenPayload

    next()
  } catch (err) {
    res.status(403).json({ message: 'Invalid token.' })
    return
  }
}
