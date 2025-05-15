"use client"

import { createContext, ReactNode, useContext, useState } from "react"
import { LucideIcon } from "lucide-react"

export interface Team {
  name: string
  logo: LucideIcon
  plan: string
}

interface TeamContextType {
  activeTeam: Team
  setActiveTeam: (team: Team) => void
}

const TeamContext = createContext<TeamContextType | undefined>(undefined)

export function useTeam() {
  const context = useContext(TeamContext)
  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider")
  }
  return context
}

export function TeamProvider({
  children,
  initialTeam,
}: {
  children: ReactNode
  initialTeam: Team
}) {
  const [activeTeam, setActiveTeam] = useState<Team>(initialTeam)

  return (
    <TeamContext.Provider value={{ activeTeam, setActiveTeam }}>{children}</TeamContext.Provider>
  )
}
