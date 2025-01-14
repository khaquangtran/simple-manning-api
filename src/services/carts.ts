import prisma from '../prisma'
import type { Prisma } from '@prisma/client'

export const getBookInCart = async (where: Prisma.CartItemWhereUniqueInput) => {
  return prisma.cartItem.findUnique({ where })
}

export const checkBookInCart = async (customerId: number, bookId: number) => {
  return prisma.cartItem.findFirst({
    where: { customerId, bookId, isCheckedOut: false },
  })
}

export const addBookToCart = async (customerId: number, bookId: number) => {
  return prisma.cartItem.create({ data: { customerId, bookId, quantity: 1 } })
}

export const updateBookInCart = async (
  cartItemId: number,
  quantity: number
) => {
  await prisma.cartItem.update({
    data: { quantity },
    where: { id: cartItemId },
  })
}

export const getCartItems = async (args: Prisma.CartItemFindManyArgs) => {
  return prisma.cartItem.findMany(args)
}
