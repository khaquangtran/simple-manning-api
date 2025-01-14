import express, { Request, Response } from 'express'
import {
  addBookToCart,
  checkBookInCart,
  getBookInCart,
  getCartItems,
  updateBookInCart,
} from '../services/carts'
import { verifyToken } from '../middlewares/auth'

const router = express.Router()
router.use(verifyToken)

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const customerId = req.user.customerId
  const { bookId } = req.body

  if (!customerId || !bookId) {
    res.status(422).json({ message: 'Missing required fields' })
    return
  }

  const bookInCart = await checkBookInCart(customerId, bookId)
  const isBookInCart = !!bookInCart

  if (isBookInCart) {
    await updateBookInCart(bookInCart.id, bookInCart.quantity + 1)
    res.json({ message: `CartItem ${bookInCart.id} updated successfully` })
  } else {
    const addedBook = await addBookToCart(customerId, bookId)
    res.json(addedBook)
  }
})

router.put('/:cartItemId', async (req: Request, res: Response) => {
  const customerId = req.user.customerId
  const cartItemId = Number(req.params.cartItemId)
  const quantity = req.body.quantity ?? 0

  if (!quantity) {
    res.status(422).json({ message: 'Missing required fields' })
    return
  }

  const bookInCart = await getBookInCart({
    id: cartItemId,
    customerId,
    isCheckedOut: false,
  })

  if (!bookInCart) {
    res.status(404).json({ message: `CartItem ${cartItemId} not found` })
    return
  }

  const adjustQuantity = Math.max(0, bookInCart.quantity + quantity)

  await updateBookInCart(cartItemId, adjustQuantity)

  res.json({ message: `CartItem ${cartItemId} updated successfully` })
})

router.get('/', async (req: Request, res: Response) => {
  const customerId = req.user.customerId

  const page = Number(req.query.page ?? 1)
  const take = Number(req.query.take ?? 20)
  const skip = (page - 1) * take

  const cartItems = await getCartItems({
    where: { customerId, isCheckedOut: false, quantity: { gt: 0 } },
    skip,
    take,
  })

  res.json(cartItems)
})

export default router
