import { PrismaClient } from '@prisma/client'

// avoid hot reload
const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === "development") {
    global.prisma = prisma
}
export { prisma }