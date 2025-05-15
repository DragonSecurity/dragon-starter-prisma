"use client"

import { ReactNode } from "react"
import { GalleryVerticalEnd } from "lucide-react"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { TeamProvider } from "@/components/providers/team-provider"

const defaultTeam = {
  name: "Acme Inc",
  logo: GalleryVerticalEnd,
  plan: "Enterprise",
}

export default function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <TeamProvider initialTeam={defaultTeam}>
        <DashboardSidebar variant="inset" />
        <SidebarInset>
          <DashboardHeader title="Dashboard" />
          <div className="flex flex-1 flex-col">{children}</div>
        </SidebarInset>
      </TeamProvider>
    </SidebarProvider>
  )
}
