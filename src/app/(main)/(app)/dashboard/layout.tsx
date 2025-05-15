import { ReactNode } from "react"
import { redirect } from "next/navigation"

import { getSession } from "@/lib/auth"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession()

  if (!session?.user) {
    return redirect("/auth/login")
  }

  return (
    <SidebarProvider>
      <DashboardSidebar variant="inset" />
      <SidebarInset>
        <DashboardHeader title={"Dashboard"} />
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
