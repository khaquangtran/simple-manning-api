import prisma from '../prisma'
import { Prisma } from '@prisma/client'

export const getCustomer = async (where: Prisma.CustomerWhereUniqueInput) => {
  return prisma.customer.findUnique({ where })
}

export const createCustomer = async (data: Prisma.CustomerCreateInput) => {
  return prisma.customer.create({ data })
}
