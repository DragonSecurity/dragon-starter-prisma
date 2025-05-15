import Link from "next/link"
import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/auth"
import { LoginInForm } from "@/app/(main)/(auth)/auth/login/login-form"

export default async function SignInPage() {
  const currentUser = await getCurrentUser()

  if (currentUser) {
    redirect("/dashboard")
  }
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <div className="min-w-[420px] space-y-5">
        <div className="space-y-1.5 text-center">
          <h1 className="text-3xl font-light">
            BoilerPlate/
            <Link href="/public" className="font-bold">
              Application
            </Link>
          </h1>
          <p className="text-muted-foreground text-sm [text-wrap:balance]">
            <span className="font-bold">Login</span> to continue using this app
          </p>
        </div>
        <div className="p-5 md:p-0">
          <LoginInForm />
        </div>
      </div>
    </div>
  )
}
