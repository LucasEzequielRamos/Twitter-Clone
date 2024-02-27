import { PrismaClient } from '@prisma/client'

declare global {
  interface globalThis {
    prisma: PrismaClient | undefined
  }
}

const prisma = globalThis.prisma || new PrismaClient()

export default prisma
