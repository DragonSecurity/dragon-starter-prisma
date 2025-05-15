import { Prisma } from "@/generated/prisma"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth-options"
import { prisma } from "@/lib/prisma"

export const getSession = async () => {
  return await getServerSession(authOptions)
}

export const getCurrentUser = async () => {
  try {
    const session = await getSession()

    if (!session?.user?.email) return null

    const user = await getUser({ email: session.user.email })

    if (!user) return null

    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getUser = async (where: Prisma.UserWhereUniqueInput) => {
  return prisma.user.findUnique({ where })
}
