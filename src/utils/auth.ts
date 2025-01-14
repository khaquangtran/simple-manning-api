import crypto from 'node:crypto'

export const createSalt = () => {
  return crypto.randomBytes(16).toString('hex')
}

export const hashPassword = (password: string, salt: string) => {
  const hash = crypto.createHash('sha256')
  hash.update(password + salt)
  return hash.digest('hex')
}
