"use client"

import { DashboardWrapper } from "@/components/dashboard/dashboard-wrapper"
import { useTeam } from "@/components/providers/team-provider"

export default function DashboardPage() {
  const { activeTeam } = useTeam()
  return (
    <DashboardWrapper
      title={`Dashboard Example ${activeTeam.name}`}
      subTitle="Provide at-a-glance views of key performance indicators"
    >
      <div></div>
    </DashboardWrapper>
  )
}
