import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email or username" }).email(),
  password: z.string().min(1, { message: "Please enter your password" }),
})

export const registerSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email" }).email(),
  password: z
    .string()
    .min(8, { message: "Please enter your password. It should be at least 8 characters long" }),
  name: z.string().min(1, { message: "Please enter your name" }),
  acceptTerms: z.boolean().refine((value) => value, {
    message: "You must accept the terms and conditions.",
  }),
})

export type TLogin = z.infer<typeof loginSchema>
export type TRegister = z.infer<typeof registerSchema>
