import { randomBytes } from "node:crypto"
import { addHours } from "date-fns"

import { prisma } from "@/lib/prisma"

export async function generatePasswordResetToken(email: string): Promise<string> {
  const token = randomBytes(32).toString("hex")
  const expires = addHours(new Date(), 1)

  try {
    // Check if there are any existing tokens
    const existingTokens = await prisma.passwordResetToken.findMany({
      where: {
        email,
      },
    })

    // Delete any existing tokens for this email
    if (existingTokens) {
      await prisma.passwordResetToken.deleteMany({
        where: {
          email,
        },
      })
    }
  } catch (e) {
    console.error(e)
  }

  // Create a new token
  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return passwordResetToken.token
}
