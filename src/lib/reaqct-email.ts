import { ReactElement } from "react"
import { render } from "@react-email/render"

export async function renderReactEmail(email: ReactElement): Promise<string> {
  return await render(email, {
    pretty: true,
  })
}
