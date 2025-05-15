"use client"

import { useTransition } from "react"
import { forgotPasswordAction } from "@/actions/auth-action"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { forgotSchema, TForgot } from "@/lib/schemas/auth-schema"
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

export const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<TForgot>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: TForgot) => {
    startTransition(() => {
      forgotPasswordAction(values)
        .then((callback) => {
          if (callback.success) {
            toast.success(`${callback.message}`, {
              description: "Please check your email for further instructions",
            })
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
      <Card className="mx-auto w-full md:w-[400px]">
        <CardContent className="space-y-6">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
