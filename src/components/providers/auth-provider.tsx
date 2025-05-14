"use client"

import { ReactNode } from "react"
import { SessionProvider as AuthSession } from "next-auth/react"

export function AuthProvider({ children }: { children: ReactNode }) {
  return <AuthSession>{children}</AuthSession>
}
