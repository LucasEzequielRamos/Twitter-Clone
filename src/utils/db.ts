import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

interface CustomGlobalThis {
  prisma: PrismaClient
}

declare const globalThis: CustomGlobalThis

const prisma = globalThis.prisma ?? prismaClientSingleton()

globalThis.prisma = prisma

export default prisma
