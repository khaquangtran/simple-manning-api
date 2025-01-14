import express, { Request, Response } from 'express'
import { verifyToken } from '../middlewares/auth'
import { PaymentType } from '@prisma/client'
import { doCheckout } from '../services/checkout'

const router = express.Router()
router.use(verifyToken)

type CheckoutPayload = {
  token: string // random tokenize string
  paymentType: PaymentType
}

router.post(
  '/',
  async (req: Request<{}, {}, CheckoutPayload>, res: Response) => {
    const customerId = req.user.customerId
    const { token, paymentType } = req.body

    try {
      if (paymentType === 'PAYPAL') {
        // call to PayPal to finish transaction
      } else {
        // call to STRIPE to finish transaction
      }

      const { order } = await doCheckout(customerId, paymentType, 'PAID')

      res.json(order)
    } catch (error) {
      console.error(error)
    } finally {
      // if payment fails, mark the order as 'pending'.
      // would assume that the customer would contact to the Customer Support to
      // proceed with the payment again.
      const { order } = await doCheckout(customerId, paymentType, 'PENDING')
      res.json(order)
    }
  }
)

export default router
