"use server"

import { Prisma } from "@/generated/prisma"
import { hash } from "bcryptjs"

import { sendEmail } from "@/lib/email"
import { generatePasswordResetToken } from "@/lib/password-reset"
import { prisma } from "@/lib/prisma"
import { renderReactEmail } from "@/lib/reaqct-email"
import {
  forgotSchema,
  registerSchema,
  resetPasswordSchema,
  TForgot,
  TRegister,
  TReset,
} from "@/lib/schemas/auth-schema"
import { PasswordResetEmail } from "@/components/emails/password-reset-email"

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

export const forgotPasswordAction = async (values: TForgot) => {
  try {
    const validation = forgotSchema.safeParse(values)
    if (!validation.success) throw new Error(validation.error.issues.at(0)?.message)
    const { email } = values

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    // Don't reveal if user exists or not for security reasons
    if (!user) {
      // We still return success to prevent email enumeration attacks
      return {
        success: true,
        message: "If your email is registered, you will receive a password reset link",
      }
    }

    const token = await generatePasswordResetToken(email)
    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`

    const emailHtml = await renderReactEmail(
      PasswordResetEmail({
        resetLink,
        username: user.name || undefined,
      })
    )

    // Send the email
    await sendEmail({
      to: email,
      subject: "Reset your password",
      html: emailHtml,
    })

    return {
      success: true,
      message: "If your email is registered, you will receive a password reset link",
    }
  } catch (error) {
    console.error("Error in forgotPassword:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}

export const resetPasswordAction = async (values: TReset) => {
  try {
    const validation = resetPasswordSchema.safeParse(values)
    if (!validation.success) throw new Error(validation.error.issues.at(0)?.message)

    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token: values.token },
    })

    if (!passwordResetToken) {
      return {
        success: false,
        message: "Invalid or expired token. Please request a new password reset link.",
      }
    }

    // Check if token has expired
    if (new Date() > passwordResetToken.expires) {
      // Delete expired token
      await prisma.passwordResetToken.delete({
        where: {
          id: passwordResetToken.id,
        },
      })
      return {
        success: false,
        message: "Invalid or expired token. Please request a new password reset link.",
      }
    }

    const hashedPassword = await hash(values.password, 12)

    await prisma.user.update({
      where: {
        email: passwordResetToken.email,
      },
      data: {
        password: hashedPassword,
      },
    })

    await prisma.passwordResetToken.delete({
      where: {
        id: passwordResetToken.id,
      },
    })

    return {
      success: true,
      message:
        "Your password has been reset successfully. You can now log in with your new password.",
    }
  } catch (error) {
    console.error("Error in resetPassword:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}
