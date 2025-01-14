import type { PaymentType, PaymentStatus } from '@prisma/client'
import prisma from '../prisma'
import assert from 'node:assert'

export const doCheckout = async (
  customerId: number,
  paymentType: PaymentType,
  paymentStatus: PaymentStatus
) => {
  return prisma.$transaction(async (tx) => {
    const cartItems = await tx.cartItem.findMany({
      where: { customerId, quantity: { gt: 0 }, isCheckedOut: false },
      include: { book: true },
    })

    assert(cartItems.length, `Cart of customer ${customerId} is empty`)

    await tx.cartItem.updateMany({
      data: { isCheckedOut: true },
      where: { id: { in: cartItems.map((item) => item.id) } },
    })

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.quantity * Number(item.book.price),
      0
    )

    const order = await tx.order.create({
      data: { totalPrice, paymentType, paymentStatus },
    })

    const orderItemsData = cartItems.map((item) => ({
      orderId: order.id,
      bookId: item.bookId,
      cartItemId: item.id,
    }))

    const orderItems = await tx.orderItem.createMany({ data: orderItemsData })

    return { order, orderItems }
  })
}
