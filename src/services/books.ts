import type { Prisma } from '@prisma/client'
import prisma from '../prisma'

export const getBooks = async (args: Prisma.BookFindManyArgs) => {
  return prisma.book.findMany(args)
}

export const getBookById = async (bookId: number) => {
  return prisma.book.findUnique({ where: { id: bookId } })
}
