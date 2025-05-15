"use client"

import { ComponentProps, useState } from "react"
import {
  AudioWaveform,
  BarChartIcon,
  Command,
  FolderIcon,
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  ListIcon,
  UsersIcon,
} from "lucide-react"
import { useSession } from "next-auth/react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import { TeamSwitcher } from "@/components/dashboard/team-switcher"

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: ListIcon,
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChartIcon,
    },
    {
      title: "Projects",
      url: "#",
      icon: FolderIcon,
    },
    {
      title: "Team",
      url: "#",
      icon: UsersIcon,
    },
  ],
}

export function DashboardSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  const [activeTeam, setActiveTeam] = useState(data.teams[0])

  if (!session) return null

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={data.teams}
          activeTeam={activeTeam}
          onTeamChangeAction={setActiveTeam}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} activeTeam={activeTeam} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
