import { ReactNode } from "react"

import { Footer } from "@/components/global/footer"
import { Header } from "@/components/global/header"

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="mt-40 md:mt-20">{children}</div>
      <Footer />
    </>
  )
}
