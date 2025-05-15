"use server"

import { Prisma } from "@/generated/prisma"
import { hash } from "bcryptjs"

import { prisma } from "@/lib/prisma"
import { registerSchema, TRegister } from "@/lib/schemas/auth-schema"

export const registerAction = async (values: TRegister) => {
  const validation = registerSchema.safeParse(values)

  if (!validation.success) throw new Error(validation.error.issues.at(0)?.message)

  const { email, name, password } = values
  const hashedPassword = await hash(password, 12)

  try {
    await prisma.user.create({
      data: { name: name, password: hashedPassword, email },
    })

    return {
      message: "Create new user successfully",
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error(
          `The ${(error.meta as { modelName: string; target: string[] }).target?.at(
            0
          )} you have chosen is already in use.`
        )
      }
    }
    throw new Error("Something broke. Failed to register user")
  }
}
