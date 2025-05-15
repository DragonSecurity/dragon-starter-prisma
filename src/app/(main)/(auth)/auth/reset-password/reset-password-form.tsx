"use client"

import { useEffect, useReducer, useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { resetPasswordAction } from "@/actions/auth-action"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, EyeIcon, EyeOffIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { resetPasswordSchema, TReset } from "@/lib/schemas/auth-schema"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [seePassword, toggleSeePassword] = useReducer((state) => !state, false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const token = searchParams.get("token")

  useEffect(() => {
    if (!token) {
      setError("Invalid password reset link. Please request a new one.")
    }
  }, [token])

  const form = useForm<TReset>({
    mode: "all",
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token!,
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: TReset) {
    startTransition(() => {
      resetPasswordAction(values)
        .then((callback) => {
          if (callback.success) {
            toast.success(`${callback.message}`)
            router.push("/auth/login")
          } else {
            toast.error(`${callback.message}`)
          }
        })
        .catch((error) => {
          toast.error(error.message)
        })
    })
  }

  return (
    <div className="w-full">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Card className="mx-auto w-full md:w-[400px]">
        <CardContent className="space-y-6">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <Input disabled={isPending} hidden {...form.register("token")} value={token!} />

              <FormField
                control={form.control}
                name="password"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-1.5">
                        <Input
                          disabled={isPending}
                          type={seePassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={toggleSeePassword}
                        >
                          {seePassword ? (
                            <EyeOffIcon className="h-4 w-4 text-zinc-700" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-zinc-700" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-1.5">
                        <Input
                          disabled={isPending}
                          type={seePassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={toggleSeePassword}
                        >
                          {seePassword ? (
                            <EyeOffIcon className="h-4 w-4 text-zinc-700" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-zinc-700" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending || !!error}>
                {isPending ? "Resetting Password..." : "Reset Password"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
