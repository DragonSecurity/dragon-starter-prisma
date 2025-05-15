import { ReactNode } from "react"
import { redirect } from "next/navigation"

import { getSession } from "@/lib/auth"
import ClientLayoutWrapper from "@/components/dashboard/client-layout-wrapper"

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession()

  if (!session?.user) {
    return redirect("/auth/login")
  }

  return <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
}
