import Link from "next/link"

import { ResetPasswordForm } from "@/app/(main)/(auth)/auth/reset-password/reset-password-form"

export default function ResetPasswordPage() {
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
            Complete the form below to complete{" "}
            <span className="font-bold">Resetting your password</span>
          </p>
        </div>
        <div className="p-5 md:p-0">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  )
}
