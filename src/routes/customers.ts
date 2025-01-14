import express, { Request, Response } from 'express'
import { createCustomer, getCustomer } from '../services/customers'
import { createSalt, hashPassword } from '../utils/auth'
import { generateToken } from '../middlewares/auth'

const router = express.Router()

router.post('/signup', async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, password } = req.body

  if (!firstName || !lastName || !email || !password) {
    res.status(422).json({ message: 'Missing required fields' })
    return
  }

  const customer = await getCustomer({ email })

  if (customer) {
    res
      .status(400)
      .json({ message: `Customer with email ${email} already exists` })
    return
  }

  const salt = createSalt()
  const hashedPassword = hashPassword(password, salt)

  const data = { firstName, lastName, email, password: hashedPassword, salt }

  const newCustomer = await createCustomer(data)

  res.status(201).json(newCustomer)
})

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(422).json({ message: 'Missing required fields' })
    return
  }

  const customer = await getCustomer({ email })

  if (!customer) {
    res
      .status(401)
      .json({ message: `Customer with email ${email} does not exist` })
    return
  }

  const salt = customer.salt
  const hashedPassword = hashPassword(password, salt)

  if (hashedPassword !== customer.password) {
    res.status(401).json({ message: 'Wrong password' })
    return
  }

  const token = generateToken({ customerId: customer.id })

  res.status(200).json(token)
})

export default router
